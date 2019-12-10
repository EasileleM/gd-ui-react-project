import axios from 'axios';
import {SERVER_URL} from '../constants/constants';

export function signInFetch(data) {
  return axios(`${SERVER_URL}/api/signIn`, {
    method: 'post',
    withCredentials: true,
    'Content-Type' : 'application/json',
    data
  });
}