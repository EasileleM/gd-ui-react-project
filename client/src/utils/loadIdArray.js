import axios from 'axios';
import i18n from '../i18n';
import {SERVER_URL} from '../constants/index';

export function loadIdArray(id) {
  return axios.get(`${SERVER_URL}/api/items?id=${id.join(',')}&lang=${i18n.language}`);
}