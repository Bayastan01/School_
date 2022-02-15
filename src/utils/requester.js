import axios from 'axios';
import {API_URL, API_VERSION} from './settings';
import {getKey} from './storage';
import {BaseException} from './index';

const request = async (cmd, method, data, silence = false) => {
  try {
    const user = await getKey('user');

    const res = await axios.request({
      url: `/v${API_VERSION}/${cmd}`,
      baseURL: API_URL,
      method,
      [method === 'post' ? 'data' : 'params']: data,
      headers: {
        Authorization: user?.token ? `Bearer ${user?.token}` : null,
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

    if (!silence) {
      err.show();
    }

    throw err;
  }
};

export default {
  get: (cmd, data, silence = false) => {
    try {
      return request(cmd, 'get', data, silence);
    } catch (e) {
      throw e;
    }
  },
  delete: (cmd, data, silence = false) => {
    try {
      return request(cmd, 'delete', data, silence);
    } catch (e) {
      throw e;
    }
  },
  post: (cmd, data, silence = false) => {
    try {
      return request(cmd, 'post', data, silence);
    } catch (e) {
      throw e;
    }
  },
};
