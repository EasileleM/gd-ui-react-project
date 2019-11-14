import updateItem from '../updateItem';
import { initialState } from '../../../reducers/cartReducer';
import { updateItems } from '../../../action-creators/cart-action-creator';

describe('updateItem cart', () => {
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

  it('Should change item amount', () => {
    const dispatch = jest.fn();
    const initialStateItems = [{ generalData: { _id: 1 }, color: 1, size: 1, amount: 1 }];
    const state = {
      cartController: { ...initialState, items: initialStateItems }
    };
    const item = initialStateItems[0];
    const color = 1;
    const size = 1;
    const amount = 2;
    updateItem(state, item, color, size, amount)(dispatch);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining(updateItems([{ ...item, amount: 2 }]))
    );
  });

  it('Should change item color', () => {
    const dispatch = jest.fn();
    const initialStateItems = [
      { generalData: { _id: 1 }, color: 1, size: 1, amount: 1 },
      { generalData: { _id: 1 }, color: 2, size: 1, amount: 1 },
      { generalData: { _id: 1 }, color: 2, size: 2, amount: 1 }
    ];
    const state = {
      cartController: { ...initialState, items: initialStateItems }
    };
    const item = initialStateItems[0];
    const color = 2;
    const size = 1;
    const amount = 2;
    updateItem(state, item, color, size, amount)(dispatch);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining(updateItems([
        { generalData: { _id: 1 }, color: 2, size: 1, amount: 3 },
        { generalData: { _id: 1 }, color: 2, size: 2, amount: 1 }
      ]))
    );
  });

  it('Should change item size', () => {
    const dispatch = jest.fn();
    const initialStateItems = [{ generalData: { _id: 1 }, color: 1, size: 1, amount: 1 }];
    const state = {
      cartController: { ...initialState, items: initialStateItems }
    };
    const item = initialStateItems[0];
    const color = 1;
    const size = 2;
    const amount = 1;
    updateItem(state, item, color, size, amount)(dispatch);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining(updateItems([{ ...item, size: 2 }]))
    );
  });

  it('Should change item color', () => {
    const dispatch = jest.fn();
    const initialStateItems = [{ generalData: { _id: 1 }, color: 1, size: 1, amount: 1 }];
    const state = {
      cartController: { ...initialState, items: initialStateItems }
    };
    const item = initialStateItems[0];
    const color = 3;
    const size = 1;
    const amount = 1;
    updateItem(state, item, color, size, amount)(dispatch);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining(updateItems([{ ...item, color: 3 }]))
    );
  });

  it('Should change item color', () => {
    const dispatch = jest.fn();
    const initialStateItems =
      [{ generalData: { _id: 1 }, color: 1, size: 1, amount: 1 },
      { generalData: { _id: 1 }, color: 2, size: 1, amount: 1 },
      { generalData: { _id: 3 }, color: 2, size: 1, amount: 1 }];
    const state = {
      cartController: { ...initialState, items: initialStateItems }
    };
    const item = initialStateItems[0];
    const color = 3;
    const size = 1;
    const amount = 1;
    updateItem(state, item, color, size, amount)(dispatch);
    expect(dispatch).toBeCalledWith(
      expect.objectContaining(updateItems(
        [
          { generalData: { _id: 1 }, color: 2, size: 1, amount: 1 },
          { generalData: { _id: 3 }, color: 2, size: 1, amount: 1 },
          { generalData: { _id: 1 }, color: 3, size: 1, amount: 1 }
        ]
      ))
    );
  });

});