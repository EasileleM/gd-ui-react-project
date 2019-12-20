import axios from "axios";
import { SERVER_URL } from '../constants/constants';

export default function sendFeedback(data) {
  return axios.post(`${SERVER_URL}/api/feedback`,
    data)
}
