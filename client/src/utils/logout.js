import axios from 'axios';
import {SERVER_URL} from '../constants/constants';

export function logout() {
  return axios.post(`${SERVER_URL}/api/logout`);
}