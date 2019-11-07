import axios from 'axios';
import {SERVER_URL} from '../constants/index';

export default function loadItem(id) {
     return axios.get(`${SERVER_URL}/api/items/${id}`);
}