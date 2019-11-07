import axios from 'axios';
import i18n from '../i18n';
import {SERVER_URL} from '../constants/index';

export default function loadCard(page = 1, size = 4) {
  return axios.get(`${SERVER_URL}/api/items/all?page=${page}&size=${size}&lang=${i18n.language}`);
}