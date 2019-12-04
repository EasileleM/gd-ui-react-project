import axios from "axios";
import {SERVER_URL} from '../constants/constants';

export default function sendEmail(email) {
    return axios.post(`${SERVER_URL}/api/newsletter`,
        email)
}
