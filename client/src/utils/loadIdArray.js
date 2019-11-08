import axios from 'axios';
import {SERVER_URL} from '../constants/index';

export function loadIdArray(id) {
  return axios.get(`${SERVER_URL}/api/items?id=${id.join(',')}`);
}