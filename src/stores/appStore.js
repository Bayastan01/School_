import {createSlice} from '@reduxjs/toolkit';

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
      //localStorage.setItem('user', JSON.stringify(state.user))

      if (action.payload.token) {
        state.token = action.payload.token;
        //localStorage.setItem('token', JSON.stringify(state.token))
      }
    },
    clearSession: state => {
      state.is_authorized = false;
      state.user = null;
      state.token = null;

      //localStorage.removeItem('user')
      //localStorage.removeItem('token')
    },
  },
});

export const {makeAuth, clearSession, setPageTitle} = appStore.actions;

export default appStore.reducer;
