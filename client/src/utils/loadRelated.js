import axios from 'axios';
import {SERVER_URL} from '../constants/index';

export default function loadRelated(id) {
     return axios.get(`${SERVER_URL}/api/items/related?id=${id}`);
}