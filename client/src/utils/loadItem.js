import axios from 'axios';
import i18n from '../i18n';
import {SERVER_URL} from '../constants/index';

export default function loadItem(id) {
    return axios.get(`${SERVER_URL}/api/items/${id}?lang=${i18n.language}`);
}