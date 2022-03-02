import axios from 'axios';
import {API_URL, API_VERSION} from './settings';
import {getKey} from './storage';
import {BaseException} from './index';

const request = async (cmd, method, data, silence = false, upload = false) => {
  try {
    const user = await getKey('user');

    const res = await axios.request({
      url: `/v${API_VERSION}/${cmd}`,
      timeout: 10000,
      baseURL: API_URL,
      method,
      [method === 'post' ? 'data' : 'params']: data,
      headers: {
        'Content-Type': !upload ? 'application/json' : 'multipart/form-data',
        Authorization: user?.token ? `Bearer ${user?.token}` : null,
        Accept: 'application/json',
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
  upload: (cmd, data = {}, silence = false) => {
    try {
      const formData = new FormData();
      Object.keys(data).map(v => {
        formData.append(v, data[v]);
      });
      return request(cmd, 'post', formData, silence, true);
    } catch (e) {
      throw e;
    }
  },
};
