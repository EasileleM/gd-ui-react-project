import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {SERVER_URL} from "../../constants/constants"
import loadItemSales from "../loadItemSales";

describe('loadFilters util', () => {
  it('basic call', done => {
    const mock = new MockAdapter(axios);
    const data = {response: true};
    mock.onGet(`${SERVER_URL}/api/items/sales?size=1&page=1&lang=undefined`).reply(200, data);

    loadItemSales().then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });
});
