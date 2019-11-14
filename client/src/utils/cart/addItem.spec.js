import addItem from './addItem';
import { initialState } from '../../reducers/cartReducer';
import { updateItems } from '../../action-creators/cart-action-creator';

describe('addItem cart', () => {
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

  it('Should add item into cart if it isn\'t there already', () => {
    const dispatch = jest.fn();
    const state = { cartController: initialState };
    const initialStateItems = initialState.items;
    const item = { _id: 1 };
    const color = 1;
    const size = 1;
    const amount = 1;
    addItem(state, item, color, size, amount)(dispatch);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining(updateItems([...initialStateItems, { color, size, amount, generalData: item }]))
    );
  });

  it('If that item is already in the cart it should change item amount', () => {
    const dispatch = jest.fn();
    const state =
      { cartController: { ...initialState, items: [{ generalData: { _id: 1 }, color: 1, amount: 3, size: 1 }] } };
    const initialStateItems = initialState.items;
    const item = { _id: 1 };
    const color = 1;
    const size = 1;
    const amount = 1;
    addItem(state, item, color, size, amount)(dispatch);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining(updateItems([...initialStateItems, { color, size, amount: amount + 3, generalData: item }]))
    );
  });

  it('Item should not be added if it has incorrect amount', () => {
    const dispatch = jest.fn();
    const state = {};
    const item = { _id: 1 };
    const color = 1;
    const size = 1;
    const amount = -1;
    addItem(state, item, color, size, amount)(dispatch);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('Should add item into cart if it isn\'t there already and without given amount', () => {
    const dispatch = jest.fn();
    const state = { cartController: initialState };
    const initialStateItems = initialState.items;
    const item = { _id: 1 };
    const color = 1;
    const size = 1;
    addItem(state, item, color, size)(dispatch);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining(updateItems([...initialStateItems, { color, size, amount: 1, generalData: item }]))
    );
  });

  it('Should item with id, which some of the items in cart already has, and with different color or size', () => {
    const dispatch = jest.fn();
    const currentStateItems = [{ generalData: { _id: 1 }, color: 1, amount: 3, size: 1 }];
    const state =
      { cartController: { ...initialState, items: currentStateItems } };
    const item = { _id: 1 };
    const colorFirst = 2;
    const colorSecond = 1;
    const sizeFirst = 2;
    const sizeSecond = 1;
    const amount = 1;
    addItem(state, item, colorFirst, sizeFirst, amount)(dispatch);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining(updateItems([...currentStateItems, { color: colorFirst, size: sizeFirst, amount, generalData: item }]))
    );
    addItem(state, item, colorSecond, sizeFirst, amount)(dispatch);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining(updateItems([...currentStateItems, { color: colorSecond, size: sizeFirst, amount, generalData: item }]))
    );
    addItem(state, item, colorFirst, sizeSecond, amount)(dispatch);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining(updateItems([...currentStateItems, { color: colorFirst, size: sizeSecond, amount, generalData: item }]))
    );
  });

  it('Should only change amount of initial items', () => {
    const dispatch = jest.fn();
    const currentStateItems = [{ generalData: { _id: 1 }, color: 1, amount: 3, size: 1 }, { generalData: { _id: 1 }, color: 2, amount: 3, size: 1 }];
    const state =
      { cartController: { ...initialState,
        items: currentStateItems } };
    const item = { _id: 2 };
    const color = 3;
    const size = 1;
    const amount = 1;
    addItem(state, item, color, size, amount)(dispatch);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining(updateItems([...currentStateItems, { color, size, amount, generalData: item }]))
    );
  });
})