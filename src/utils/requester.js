import axios from 'axios';
import {API_URL, API_VERSION} from './settings';
import {getKey} from './storage';

const request = async (cmd, method, data) => {
  try {
    const token = getKey('token');

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
    console.log(e);
    throw e;
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
