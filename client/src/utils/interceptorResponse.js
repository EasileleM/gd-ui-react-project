import axios from 'axios';
import { toast } from 'react-toastify';

export const interceptor = axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  let errorCode = error.message.match(/\d+/)[0];
  let notify;
  if (errorCode >= 300 && errorCode < 400) {
    notify = () => toast("Warning: " + errorCode, { type: toast.TYPE.WARNING });
  }
  if (errorCode >= 400 && errorCode < 600) {
    notify = () => toast("Error " + errorCode, { type: toast.TYPE.ERROR });
  } else {
    notify = () => { };
  }
  let errorWithNotify = { error: error, notify: notify };
  return Promise.reject(errorWithNotify);
});