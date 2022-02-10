import {configureStore} from '@reduxjs/toolkit';
import appStore from './appStore';

const store = configureStore({
  reducer: {
    app: appStore,
  },
});

export default store;
