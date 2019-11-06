import axios from 'axios';
import {SERVER_URL} from '../constants/index';

export async function loadSlides(amount) {
  const request = await axios.get(`${SERVER_URL}/api/slider?amount=${amount}`);
  this.setState({
    ready: true,
    data: request.data
  })
}
