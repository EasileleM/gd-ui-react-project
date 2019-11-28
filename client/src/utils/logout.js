import axios from 'axios';
import {SERVER_URL} from '../constants/constants';

export function logout() {
  return Promise.resolve();
  // return axios.get(`${SERVER_URL}/api/user/isAuth`);
}