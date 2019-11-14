import fetchItems from './fetchItems';
import { fetchItemsBegin, fetchItemsSuccess, fetchItemsFailure } from '../../action-creators/favorites-action-creator';
import * as loadIfArrayModule from '../../utils/loadIdArray';
describe('fetchItems favorites', () => {
  const data = {
    items: [1, 2, 3],
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
    loadIfArrayModule.loadIdArray = jest.fn(() => {
      return Promise.resolve({ data });
    });
    const dispatch = jest.fn();
    localStorage.setItem('FavoritesItems', JSON.stringify({ 1: true, 2: true, 3: true }))
    await fetchItems()(dispatch);
    expect(dispatch.mock.calls[0]).toEqual([expect.objectContaining(fetchItemsBegin())]); 
    expect(dispatch.mock.calls[1]).toEqual([expect.objectContaining(fetchItemsSuccess([1, 2, 3], 3))]);
  });

  it('Should correctly handle failed fetching', async () => {
    const error = new Error('Failed');
    loadIfArrayModule.loadIdArray = jest.fn(() => {
      return Promise.reject(error);
    });
    const dispatch = jest.fn();
    localStorage.setItem('FavoritesItems', JSON.stringify({ 1: true, 2: true, 3: true }))
    await fetchItems()(dispatch);
    expect(dispatch.mock.calls[0]).toEqual([expect.objectContaining(fetchItemsBegin())]); 
    expect(dispatch.mock.calls[1]).toEqual([expect.objectContaining(fetchItemsFailure(error))]);
  });
})