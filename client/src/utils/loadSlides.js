import axios from 'axios';

export async function loadSlides(amount) {
  const request = await axios.get(`https://gd-ui-react-project-server.herokuapp.com/api/slider?amount=${amount}`);
  this.setState({
    ready: true,
    data: request.data
  })
}
