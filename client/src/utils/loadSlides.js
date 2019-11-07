import axios from 'axios';
import {SERVER_URL} from '../constants/index';

export default function loadSlides(amount) {
  return axios.get(`${SERVER_URL}/api/slider?amount=${amount}`);

}
