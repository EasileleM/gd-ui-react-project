import axios from "axios";
import {SERVER_URL} from '../constants/index';

export function sendEmail() {
  axios.post(`${SERVER_URL}/api/newsletter`,
  {"email": this.state.value}).then(res => {
      if (res.status === 201) {
          this.setState({value: "SUCCESS"});
      } else {
          this.setState({value: "ERROR"});
      }
  }).catch(err => {
      console.error(err);
      this.setState({value: "ERROR"});
  });
}
