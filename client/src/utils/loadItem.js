import axios from 'axios';
import i18n from '../i18n';
import {SERVER_URL} from '../constants/constants';

export default function loadItem(id, language = i18n.language) {
    return axios.get(`${SERVER_URL}/api/items/${id}?lang=${language}`);
}