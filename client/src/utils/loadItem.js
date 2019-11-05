import axios from 'axios';

export async function loadItem(id = 1) {
  const result = await axios.get(`https://gd-ui-react-project-server.herokuapp.com/api/items/${id}`);

  this.setState({
    ready: true,
    data: result.data
  })
}