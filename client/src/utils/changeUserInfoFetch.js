import axios from 'axios';
import { SERVER_URL } from '../constants/constants';

export function changeUserInfoFetch(data) {
  return axios(`${SERVER_URL}/api/account/edit`, {
    method: 'put',
    withCredentials: true,
    'Content-Type': 'application/json',
    data
  })
}