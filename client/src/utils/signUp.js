import axios from 'axios';
import {SERVER_URL} from '../constants/constants';

export function signUp() {
  return Promise.resolve({firstName: 'Meesha', lastName: 'Yes'});
  // return axios.get(`${SERVER_URL}/api/user/isAuth`);
}