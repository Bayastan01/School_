import requester from '../utils/requester';
import {getKey} from '../utils/storage';

export const checkUser = () => {
  if (!getKey('token')) {
    // TODO: clear auth data
    return;
  }

  requester
    .get('auth/me')
    .then(res => {
      console.log(res);
    })
    .catch(e => {
      console.log(e);
    });
};
