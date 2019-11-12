import axios from 'axios';
import {SERVER_URL} from '../constants/index';

export function loadFilters() {
  return axios.get(`${SERVER_URL}/api/filter`);
}