import axios from 'axios';
import i18n from '../i18n';
import { SERVER_URL } from '../constants/constants';

async function loadItemSales() {
  return axios.get(`${SERVER_URL}/api/items/sales?size=1&page=1&lang=${i18n.language}`);
}

export default loadItemSales;