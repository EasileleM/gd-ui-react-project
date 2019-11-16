import removeItem from '../removeItem';
import { initialState } from '../../../reducers/favoritesReducer';
import { updateItems } from '../../../action-creators/favorites-action-creator';

describe('removeItem favorites', () => {
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

  it('Should remove item from the favorites', () => {
    const dispatch = jest.fn();
    const currentStateItems = [{ _id: 1 }, { _id: 2 }];
    const state =
      { favoritesController: { ...initialState, items: currentStateItems } };
    const item = { _id: 1 };
    removeItem(state, item)(dispatch);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining(updateItems([{_id: 2}]))
    );
  });

});