import axios from 'axios';
import {SERVER_URL} from '../constants/constants';

export function updateUserCart(data) {
  return axios(`${SERVER_URL}/api/cart`, {
    method: 'post',
    withCredentials: true,
    'Content-Type' : 'application/json',
    data
  })
}