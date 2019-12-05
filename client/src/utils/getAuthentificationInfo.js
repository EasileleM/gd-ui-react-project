import axios from 'axios';
import { SERVER_URL } from '../constants/constants';

export function getAuthentificationInfo() {
  return axios(`${SERVER_URL}/api/isAuth`, { //TODO change isAuth endpoint if it needs
    withCredentials: true,
  })
  .then((res) => {
    return res.data;
  });
}
