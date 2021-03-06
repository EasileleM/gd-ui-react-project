import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {SERVER_URL} from "../../constants/constants"
import loadSlides from "../loadSlides";

describe('loadFilters util', () => {
  it('basic call', done => {
    const mock = new MockAdapter(axios);
    const data = {response: true};
    mock.onGet(`${SERVER_URL}/api/slider?amount=3&lang=undefined`).reply(200, data);

    loadSlides(3).then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });
});
