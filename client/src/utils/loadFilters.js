import axios from 'axios';
import {SERVER_URL} from '../constants/constants';
import i18n from '../i18n';

export function loadFilters(language = i18n.language) {
  return axios.get(`${SERVER_URL}/api/filter?lang=${language}`);
}