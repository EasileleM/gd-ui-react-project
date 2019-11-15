import loadCard from "../loadCard";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {SERVER_URL} from "../../constants"

describe('loadCard util', () => {
  it('no arguments', done => {
    const mock = new MockAdapter(axios);
    const data = {response: true};
    mock.onGet(`${SERVER_URL}/api/items/all?page=1&size=4&lang=undefined`).reply(200, data);

    loadCard().then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });

  it('with arguments', done => {
    const mock = new MockAdapter(axios);
    const data = {response: true};
    const filters = {"category": "men", "minPrice": 225, "maxPrice": 614, "brands": ["Abibas"], "sizes": ["xs"]}
    mock.onGet(`${SERVER_URL}/api/items//all?page=1&size=4&lang=undefined&filter=true&sizes=XS&brands=Abibas&categories=men&maxprice=614&minprice=225`).reply(200, data);

    loadCard(1, 4, filters).then(response => {
      expect(response.data).toEqual(data);
      done();
    });
  });
});