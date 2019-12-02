import axios from 'axios';
import {SERVER_URL} from '../constants/constants';

export function isAuth() {
  return axios(`${SERVER_URL}/api/isAuth`, {
    method: 'get',
    withCredentials: true,
  })
}