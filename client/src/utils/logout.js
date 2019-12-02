import axios from 'axios';
import {SERVER_URL} from '../constants/constants';

export function logout() {
  return axios(`${SERVER_URL}/api/logout`, {
    method: 'post',
    withCredentials: true,
  })
}