import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL, API_VERSION} from './settings';
import Toast from 'react-native-toast-message';

export const phoneNumberValidator = p =>
  typeof p === 'string' && p.startsWith('+996') && p.length === 13;

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

const EXCEPTION_TITLES = {};

const EXCEPTION_MESSAGES = {
  user_not_found: 'Пользователь не найден!',
  employee_not_found: 'Сотрудник не найден!',
  network_error: 'Ошибка соединения с сервером!',
  not_enough_balance: 'Недостаточно средств!',
  card_is_invalid: 'Недействительная карта!',
  invalid_verification_code: 'Недействительный код!',
  incorrect_code: 'Неверный код!',
};

export class BaseException extends Error {
  status = 'unknown_error';
  result = -1;
  payload = null;
  status_code = null;

  title = 'Ошибка!';

  handleNetworkError = () => {
    this.status = 'network_error';

    this.setMessage();
    this.setTitle();
  };

  handleFromResponse = err => {
    this.status_code = err.response.status;
    this.payload = err.response.data.payload;
    this.status = err.response.data.status;
    this.result = err.response.data.result;

    this.setMessage();
    this.setTitle();
  };

  show = () => {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: this.title,
      text2: this.message,
    });
  };

  setMessage = () => {
    this.message =
      this.status in EXCEPTION_MESSAGES
        ? EXCEPTION_MESSAGES[this.status]
        : 'Неизвестная ошибка!';
  };

  setTitle = () => {
    this.title =
      this.status in EXCEPTION_TITLES
        ? EXCEPTION_TITLES[this.status]
        : 'Ошибка!';
  };
}

export const getImageUrl = path => `${API_URL}/v${API_VERSION}/image/${path}`;

export class NativeFile {
  type;
  name;
  uri;

  constructor(type, name, uri) {
    this.type = type;
    this.name = name || uri.split('/').slice(-1)[0];
    this.uri = uri;
  }

  get() {
    return {
      type: this.type,
      name: this.name,
      uri:
        Platform.OS === 'android' ? this.uri : this.uri.replace('file://', ''),
    };
  }
}

const QR_STATUS_LABELS = {
  delivered: 'доставлено',
  pending_for_payment: 'в ожидании оплаты',
  being_prepared: 'в ожидании',
};

export const getQrStatusLabel = g => QR_STATUS_LABELS[g];
