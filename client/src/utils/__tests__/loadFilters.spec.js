import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {SERVER_URL} from "../../constants/constants"
import {loadFilters} from "../loadFilters";

describe('loadFilters util', () => {
  it('basic call', done => {
    const mock = new MockAdapter(axios);
    const data = {response: true};
    mock.onGet(`${SERVER_URL}/api/filter`).reply(200, data);

    loadFilters().then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });
});
