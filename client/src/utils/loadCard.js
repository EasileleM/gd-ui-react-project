import axios from 'axios';
import {SERVER_URL} from '../constants/index';

export async function loadCard(page = 1, size = 4) {
  const result = await axios.get(`${SERVER_URL}/api/items/all?page=${page}&size=${size}`);

  this.setState({
    ready: true,
    cards: [...this.state.cards, ...result.data.items],
    nextPage: result.data.nextPage
  })
}