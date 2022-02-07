import axios from 'axios';
import {API_URL, API_VERSION} from './settings';
import {getKey} from './storage';
import {BaseException} from './index';

const request = async (cmd, method, data) => {
  try {
    const token = await getKey('token');

    const res = await axios.request({
      url: `/v${API_VERSION}/${cmd}`,
      baseURL: API_URL,
      method,
      [method === 'post' ? 'data' : 'params']: data,
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    });
    return res.data;
  } catch (e) {
    const err = new BaseException(e.message);

    console.dir(e);

    if ('response' in e && e.response !== undefined) {
      err.handleFromResponse(e);
    } else {
      err.handleNetworkError(e);
    }

    err.show();

    throw err;
  }
};

export default {
  get: (cmd, data) => {
    try {
      return request(cmd, 'get', data);
    } catch (e) {
      throw e;
    }
  },
  post: (cmd, data) => {
    try {
      return request(cmd, 'post', data);
    } catch (e) {
      throw e;
    }
  },
};
