import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const phoneNumberValidator = p =>
  typeof p === 'string' && p.startsWith('+996') && p.length === 13;

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

const EXCEPTION_TITLES = {};

const EXCEPTION_MESSAGES = {
  user_not_found: 'Пользователь не найден!',
  employee_not_found: 'Сотрудник не найден!',
  network_error: 'Ошибка соединения с сервером!',
};

export class BaseException extends Error {
  status = 'unknown_error';
  result = -1;
  payload = null;
  status_code = null;

  title = 'Ошибка!';

  handleNetworkError = err => {
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
    Alert.alert(this.title, this.message);
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
