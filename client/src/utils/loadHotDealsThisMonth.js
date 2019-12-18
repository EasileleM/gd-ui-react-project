import axios from 'axios';
import i18n from '../i18n';
import {SERVER_URL} from '../constants/constants';

export default function loadHotDealsThisMonth(page = 1, size = 8) {
  let url = `${SERVER_URL}/api/items/hot-deals-this-month?size=${size}`;
  return axios.get(url);
}