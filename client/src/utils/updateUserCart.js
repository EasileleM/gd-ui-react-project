import axios from 'axios';
import i18n from '../i18n';
import { SERVER_URL } from '../constants/constants';

export function updateUserCart(data) {
  return axios(`${SERVER_URL}/api/cart?lang=${i18n.language}`, {
    method: 'put',
    withCredentials: true,
    'Content-Type': 'application/json',
    data
  })
}