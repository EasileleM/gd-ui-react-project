import axios from 'axios';
import {SERVER_URL} from '../constants/index';

export async function loadItem(id = 1) {
  const result = await axios.get(`${SERVER_URL}/api/items/${id}`);

  this.setState({
    ready: true,
    data: result.data
  })
}