import {createSlice} from '@reduxjs/toolkit';
import storage from '../utils/storage';

const initialState = {
  is_authorized: false,
  user: null,
  token: null,
};

export const appStore = createSlice({
  name: 'appStore',
  initialState,
  reducers: {
    makeAuth: (state, action) => {
      state.is_authorized = true;
      state.user = action.payload.user;
      state.token = action.payload.token;

      if (!action.payload.from_storage) {
        storage
          .save({
            key: 'user',
            data: action.payload,
          })
          .then();
      }
    },
    clearSession: state => {
      state.is_authorized = false;
      state.user = null;
      state.token = null;

      storage.remove({key: 'user'}).then();
    },
  },
});

export const {makeAuth, clearSession} = appStore.actions;

export default appStore.reducer;
