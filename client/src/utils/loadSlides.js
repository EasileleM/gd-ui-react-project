import axios from 'axios';
import i18n from '../i18n';
import {SERVER_URL} from '../constants/index';

export default function loadSlides(amount) {
  return axios.get(`${SERVER_URL}/api/slider?amount=${amount}&lang=${i18n.language}`);

}
