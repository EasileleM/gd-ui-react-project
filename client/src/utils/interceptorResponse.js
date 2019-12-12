import axios from 'axios';
import { error404, error400, error500 } from "../redux/action-creators/error/actions";
import store from "../redux/store"

export const interceptorInit = () => {
  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.message === 'Network Error') {
      return Promise.reject(error);
    }
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
  })
};