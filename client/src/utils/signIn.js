import axios from 'axios';
import {SERVER_URL} from '../constants/constants';

export function signIn(data) {
  data = {"email": "asman@grid", "password" : "qwerty1234@@Q", "firstName": "Asma1n", "lastName": "Umbe1tov"};
  return axios.post(`${SERVER_URL}/api/signIn`, data);
}