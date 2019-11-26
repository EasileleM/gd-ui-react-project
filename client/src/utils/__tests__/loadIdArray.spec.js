import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {SERVER_URL} from "../../constants/constants"
import {loadIdArray} from "../loadIdArray";

describe('loadFilters util', () => {
  it('basic call', done => {
    const mock = new MockAdapter(axios);
    const data = {response: true};
    mock.onGet(`${SERVER_URL}/api/items?id=1,2,3,4&lang=undefined`).reply(200, data);

    loadIdArray([1,2,3,4]).then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });
});
