import axios from 'axios';
import {SERVER_URL} from '../constants/constants';

export function updateUserFavorites(data) {
  return axios(`${SERVER_URL}/api/favorites`, {
    method: 'put',
    withCredentials: true,
    'Content-Type' : 'application/json',
    data
  })
}
