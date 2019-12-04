import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {SERVER_URL} from "../../constants/constants"
import loadItem from "../loadItem";

describe('loadFilters util', () => {
  it('basic call', done => {
    const mock = new MockAdapter(axios);
    const data = {response: true};
    mock.onGet(`${SERVER_URL}/api/items/1?lang=undefined`).reply(200, data);

    loadItem(1).then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });
});
