import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {SERVER_URL} from "../../constants"
import loadRelated from "../loadRelated";

describe('loadFilters util', () => {
  it('basic call', done => {
    const mock = new MockAdapter(axios);
    const data = {response: true};
    mock.onGet(`${SERVER_URL}/api/items/related?id=1`).reply(200, data);

    loadRelated(1).then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });
});
