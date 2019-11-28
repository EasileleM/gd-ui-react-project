import axios from 'axios';
import {SERVER_URL} from '../constants/constants';

export function isAuth() {
  return Promise.resolve({firstName: 'Meesha', lastName: 'Yes'});
  // return axios.get(`${SERVER_URL}/api/user/isAuth`);
}