import axios from 'axios';
import {SERVER_URL} from '../constants/constants';

export function isAuth() {
  return axios.post(`${SERVER_URL}/api/isAuth`);
}