import addItem from './addItem';
import { initialState } from '../../reducers/favoritesReducer';
import { updateItems } from '../../action-creators/favorites-action-creator';

describe('addItem favorites', () => {
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

  it('Should add item into favorites if it isn\'t there already', () => {
    const dispatch = jest.fn();
    const state = { favoritesController: { ...initialState, items: [{ _id: 2 }] } };
    const initialStateItems = state.favoritesController.items;
    const item = { _id: 1 };
    addItem(state, item)(dispatch);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining(updateItems([...initialStateItems, item]))
    );
  });

  it('Shouldn\'t add item into favorites if it is there already', () => {
    const dispatch = jest.fn();
    const state = { favoritesController: { ...initialState, items: [{ _id: 1 }, { _id: 10 }, { _id: 5 }] } };
    const item = { _id: 1 };
    addItem(state, item)(dispatch);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('Should add item into favorites if there is no items', () => {
    const dispatch = jest.fn();
    const state = { favoritesController: { ...initialState, items: [] } };
    const item = { _id: 1 };
    addItem(state, item)(dispatch);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining(updateItems([item]))
    );
  });
})