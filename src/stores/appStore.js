import {createSlice} from '@reduxjs/toolkit';
import storage from '../utils/storage';

const initialState = {
  is_authorized: false,
  user: null,
  token: null,
  store: null,
  employee: null,
  user_type: null,
  parent: null,
};

export const appStore = createSlice({
  name: 'appStore',
  initialState,
  reducers: {
    makeAuth: (state, action) => {
      state.is_authorized = true;
      state.user = action.payload.data.user;
      state.store = action.payload.data.store;
      state.parent = action.payload.data.parent;
      state.employee = action.payload.data.employee;
      state.token = action.payload.data.token;

      if (state.store && state.employee) {
        state.user_type = 'store';
      } else if (state.parent) {
        state.user_type = 'parent';
      }

      if (!action.payload.from_storage) {
        storage
          .save({
            key: 'user',
            data: action.payload.data,
          })
          .then();
      }
    },
    clearSession: state => {
      state.is_authorized = false;
      state.user = null;
      state.token = null;
      state.store = null;
      state.parent = null;
      state.employee = null;
      state.user_type = null;

      storage.remove({key: 'user'}).then();
    },
  },
});

export const {makeAuth, clearSession} = appStore.actions;

export default appStore.reducer;
