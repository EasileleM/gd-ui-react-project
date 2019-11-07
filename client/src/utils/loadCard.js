import axios from 'axios';
import {SERVER_URL} from '../constants/index';

export default function loadCard(page = 1, size = 4) {
  return axios.get(`${SERVER_URL}/api/items/all?page=${page}&size=${size}`);
}