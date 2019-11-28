import axios from 'axios';
import {SERVER_URL} from '../constants/constants';

export function signIn(data) {
  return axios.post(`${SERVER_URL}/api/signIn`, data);
}