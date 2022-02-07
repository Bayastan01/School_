import requester from '../utils/requester';
import {getKey} from '../utils/storage';

export const checkUser = async () => {
  if (!(await getKey('token'))) {
    // TODO: clear auth data
    return;
  }

  requester
    .get('auth/me')
    .then(res => {
      console.log(res);
    })
    .catch(e => {
      // TODO: handle invalid or expired token exception
    });
};
