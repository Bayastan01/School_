import {Platform} from 'react-native';

export const DEBUG_MODE = process.env.NODE_ENV !== 'production';

export const APP_TITLE = 'Besoft School';
export const APP_VERSION = Platform.select({
  android: 7,
  ios: 1,
});

export const API_URL = DEBUG_MODE
  ? 'http://192.168.0.105:5002'
  : 'https://api.school.besoft.kg';
export const API_VERSION = 1;

export const VERIFICATION_CODE_LENGTH = 4;
export const TOKEN_EXPIRE_DAYS = 30;
export const ITEMS_PER_PAGE = 30;
