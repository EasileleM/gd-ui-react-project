import axios from 'axios';
import {SERVER_URL} from '../constants/index';

export async function loadItem() {
  const result = await axios.get(`${SERVER_URL}/api/items/sales?size=1&page=1`);

  this.setState({
    ready: true,
    data: result.data.items[0]
  })
}