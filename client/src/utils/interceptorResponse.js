import axios from 'axios';
import {error404, error400, error500} from "../action-creators/error-action-creator";
import store from "../store"

export const interceptor = axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  let errorCode = Number(error.message.match(/\d+/)[0]);
  if (errorCode === 400) {
    store.dispatch(error400());
  }
  if (errorCode === 404) {
    store.dispatch(error404());
  }
  if (errorCode === 500) {
    store.dispatch(error500());
  }
  return Promise.reject(error);
});