import axios from 'axios';
import {error404} from "../action-creators/error-action-creator";
import store from "../store"

export const interceptor = axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  let errorCode = error.message.match(/\d+/)[0];
  if (errorCode >= 400 && errorCode < 600) {
    store.dispatch(error404());
  }
  return Promise.reject(error);
});