import axios from 'axios';
import { SERVER_URL } from '../constants/constants';

export function getAuthentificationInfo() {
  return axios(`${SERVER_URL}/api/auth`, {
    method: 'get',
    withCredentials: true,
  })
    .then((res) => {
      return res.data;
    });
}
