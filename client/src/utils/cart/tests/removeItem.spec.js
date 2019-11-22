import removeItem from '../removeItem';
import { initialState } from '../../../store/cart/cart-reducers/cartReducer';
import { updateItems } from '../../../store/cart/cart-actions/cart-action-creator';

describe('removeItem cart', () => {
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

  it('Should remove item from the cart', () => {
    const dispatch = jest.fn();
    const currentStateItems = [{ generalData: { _id: 1 }, color: 1, amount: 3, size: 1 }, { generalData: { _id: 4 }, color: 2, amount: 3, size: 1 }];
    const state =
      { cartController: { ...initialState, items: currentStateItems } };
    const item = { generalData: { _id: 1 }, color: 1, size: 1, amount: 3 };
    removeItem(state, item)(dispatch);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining(updateItems([{ generalData: { _id: 4 }, color: 2, amount: 3, size: 1 }]))
    );
  });

  it('Should remove item from the cart without affecting other cards', () => {
    const dispatch = jest.fn();
    const currentStateItems = [{ generalData: { _id: 1 }, color: 1, amount: 3, size: 1 }, { generalData: { _id: 1 }, color: 2, amount: 3, size: 1 }, { generalData: { _id: 1 }, color: 3, amount: 3, size: 1 }];
    const state =
      { cartController: { ...initialState, items: currentStateItems } };
    const item = { generalData: { _id: 1 }, color: 1, size: 1, amount: 3 };
    removeItem(state, item)(dispatch);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining(updateItems([{ generalData: { _id: 1 }, color: 2, amount: 3, size: 1 }, { generalData: { _id: 1 }, color: 3, amount: 3, size: 1 }]))
    );
  });
});