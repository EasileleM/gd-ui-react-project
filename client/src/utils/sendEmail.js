import axios from "axios";

export function sendEmail() {
  axios.post('https://gd-ui-react-project-server.herokuapp.com/api/newsletter',
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
