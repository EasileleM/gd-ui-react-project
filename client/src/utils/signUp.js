import axios from 'axios';
import {SERVER_URL} from '../constants/constants';

export function signUp(data) {
  return axios(`${SERVER_URL}/api/signUp`, {
    method: 'post',
    withCredentials: true,
    'Content-Type' : 'application/json',
    data
  })
}