import axios from 'axios';
import {SERVER_URL} from '../constants/index';

export async function loadItemSales() {
  return axios.get(`${SERVER_URL}/api/items/sales?size=1&page=1`);
}