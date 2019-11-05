import axios from 'axios';

export async function loadCard(page = 1, size = 4) {
  const result = await axios.get(`https://gd-ui-react-project-server.herokuapp.com/api/items/pagination?page=${page}&size=${size}`);

  this.setState({
    ready: true,
    cards: [...this.state.cards, ...result.data.items],
    nextPage: result.data.nextPage
  })
}