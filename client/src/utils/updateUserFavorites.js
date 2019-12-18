import axios from 'axios';
import i18n from '../i18n';
import { SERVER_URL } from '../constants/constants';

export function updateUserFavorites(data) {
  return axios(`${SERVER_URL}/api/favorites?lang=${i18n.language}`, {
    method: 'put',
    withCredentials: true,
    'Content-Type': 'application/json',
    data
  })
}
