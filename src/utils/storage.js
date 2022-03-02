import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN_EXPIRE_DAYS} from './settings';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 86400000 * TOKEN_EXPIRE_DAYS,
  enableCache: true,
  sync: {},
});

export const getKey = async key => {
  let data = null;

  try {
    data = await storage.load({
      key,
      //autoSync: true,
      //syncInBackground: true,
      //syncParams: {
      //  extraFetchOptions: {},
      //},
    });
  } catch (e) {
    console.warn(e.message);
    switch (e.name) {
      case 'NotFoundError':
        // TODO;
        break;
      case 'ExpiredError':
        // TODO
        break;
    }
  }

  return data;
};

export default storage;
