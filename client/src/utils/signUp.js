import axios from 'axios';
import {SERVER_URL} from '../constants/constants';

export function signUp(data) {
  return axios.post(`${SERVER_URL}/api/signUp`, data);
}