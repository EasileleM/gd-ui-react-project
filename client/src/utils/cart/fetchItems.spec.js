import fetchItems from './fetchItems';
import { fetchItemsBegin, fetchItemsSuccess, fetchItemsFailure } from '../../action-creators/cart-action-creator';
import * as loadIfArrayModule from '../../utils/loadIdArray';
describe('fetchItems cart', () => {
  const data = {
    items: [
      {_id: 1, price: 10},
      {_id: 2, price: 20},
      {_id: 3, price: 10},
    ],
    rejectedId: [4],
  }

  beforeEach(() => {
    class LocalStorageMock {
      constructor() {
        this.store = {};
      }

      clear() {
        this.store = {};
      }

      getItem(key) {
        return this.store[key] || null;
      }

      setItem(key, value) {
        this.store[key] = value.toString();
      }

      removeItem(key) {
        delete this.store[key];
      }
    };

    global.localStorage = new LocalStorageMock();
  });

  it('Should fetch items', async () => {
    const readyData = {
      items: [
        {generalData: {_id: 1, price: 10}, color: 1, amount: 1, size: 1},
        {generalData: {_id: 2, price: 20}, color: 1, amount: 1, size: 1},
        {generalData: {_id: 3, price: 10}, color: 1, amount: 1, size: 1},
      ]
    }
    loadIfArrayModule.loadIdArray = jest.fn(() => {
      return Promise.resolve({ data });
    });
    const dispatch = jest.fn();
    localStorage.setItem('CartItems', JSON.stringify({
      1: [{color: 1, size: 1, amount: 1}],
      2: [{color: 1, size: 1, amount: 1}],
      3: [{color: 1, size: 1, amount: 1}]
    }))
    await fetchItems()(dispatch);
    expect(dispatch.mock.calls[0]).toEqual([expect.objectContaining(fetchItemsBegin())]); 
    expect(dispatch.mock.calls[1]).toEqual([expect.objectContaining(fetchItemsSuccess(readyData.items, readyData.items.length, 40))]);
  });

  it('Should correctly handle failed fetching', async () => {
    const error = new Error('Failed');
    loadIfArrayModule.loadIdArray = jest.fn(() => {
      return Promise.reject(error);
    });
    const dispatch = jest.fn();
    localStorage.setItem('CartItems', JSON.stringify({ 1: true, 2: true, 3: true }))
    await fetchItems()(dispatch);
    expect(dispatch.mock.calls[0]).toEqual([expect.objectContaining(fetchItemsBegin())]); 
    expect(dispatch.mock.calls[1]).toEqual([expect.objectContaining(fetchItemsFailure(error))]);
  });
})