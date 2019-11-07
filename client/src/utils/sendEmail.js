import axios from "axios";
import {SERVER_URL} from '../constants/index';

export default function sendEmail(email) {
    return axios.post(`${SERVER_URL}/api/newsletter`,
        email)
}
