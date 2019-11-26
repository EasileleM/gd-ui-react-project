import axios from 'axios';
import {SERVER_URL} from '../constants/constants';

export function loadFilters() {
  return axios.get(`${SERVER_URL}/api/filter`);
}