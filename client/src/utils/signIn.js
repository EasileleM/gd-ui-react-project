import axios from 'axios';
import {SERVER_URL} from '../constants/constants';

export function signIn(data) {
  //data = {"email": "asmanumbetov@gmail.com", "password": "qwerty1234@@Q", "firstName": "Asma1n", "lastName": "Umbe1tov"};
  return axios(`${SERVER_URL}/api/signIn`, {
    method: 'post',
    withCredentials: true,
    'Content-Type' : 'application/json',
    data
  })
} //TODO remove mock