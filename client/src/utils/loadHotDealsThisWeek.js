import axios from 'axios';
import {SERVER_URL} from '../constants/constants';
import i18n from '../i18n';


export default function loadHotDealsThisWeek(page = 1, size = 8) {
  let url = `${SERVER_URL}/api/items/hot-deals-this-week?size=${size}&lang=${i18n.language}`;
  return axios.get(url);
}