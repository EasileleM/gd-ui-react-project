import { cartReducer, initialState } from './cartReducer';
import * as cartActionCreators from '../action-creators/cart-action-creator';

describe('Cart reducer', () => {
  describe('CART_ACTION.OPEN', () => {
    it('CART_ACTION.OPEN should not open cart in initial state', () => {
      expect(cartReducer(initialState, cartActionCreators.openCart())).toEqual({
        ...initialState,
        opened: false
      })
    });
    it('CART_ACTION.OPEN should open cart after successful loading more that 0 item', () => {
      const previousState = {
        ...initialState,
        loading: false,
        size: 1
      };
      expect(cartReducer(previousState, cartActionCreators.openCart())).toEqual({
        ...previousState,
        opened: true
      })
    });
    it('CART_ACTION.OPEN should not open cart after failed loading', () => {
      const previousState = {
        ...initialState,
        failure: true,
      };
      expect(cartReducer(previousState, cartActionCreators.openCart())).toEqual({
        ...previousState,
        opened: false
      })
    });
    it('CART_ACTION.OPEN should not open cart while loading', () => {
      const previousState = {
        ...initialState,
        loading: true
      };
      expect(cartReducer(previousState, cartActionCreators.openCart())).toEqual({
        ...previousState,
        opened: false
      });
    });
  });

  describe('CART_ACTION.CLOSE', () => {
    it('CART_ACTION.CLOSE should close cart', () => {
      const previousState = {
        ...initialState,
        opened: true
      };
      expect(cartReducer(previousState, cartActionCreators.closeCart())).toEqual({
        ...previousState,
        opened: false
      });
    });
  });

  describe('CART_ACTION.UPDATE_ITEMS', () => {
    it('CART_ACTION.UPDATE_ITEMS should update items', () => {
      const mockItems = [
        { amount: 3, generalData: { price: 100 } },
        { amount: 1, generalData: { price: 200 } },
        { amount: 1, generalData: { price: 150 } },
      ];
      const previousState = {
        ...initialState,
        items: [
          { amount: 1, generalData: { price: 100 } },
          { amount: 2, generalData: { price: 200 } }
        ],
        size: 2,
        orderPrice: 400
      };
      expect(cartReducer(previousState, cartActionCreators.updateItems(mockItems))).toEqual({
        ...previousState,
        items: mockItems,
        size: mockItems.length,
        orderPrice: 650
      });
    });
  });

  describe('CART_ACTION.FETCH_BEGIN', () => {
    it('CART_ACTION.FETCH_BEGIN should start loading', () => {
      expect(cartReducer(initialState, cartActionCreators.fetchItemsBegin())).toEqual({
        ...initialState,
        loading: true
      });
    });
  });

  describe('CART_ACTION.FETCH_SUCCESS', () => {
    it('CART_ACTION.FETCH_SUCCESS should set loaded items', () => {
      const mockItems = [
        { amount: 3, generalData: { price: 100 } },
        { amount: 1, generalData: { price: 200 } },
        { amount: 1, generalData: { price: 150 } },
      ];
      expect(cartReducer(initialState, cartActionCreators.fetchItemsSuccess(mockItems, mockItems.length, 650))).toEqual({
        ...initialState,
        items: mockItems,
        size: mockItems.length,
        orderPrice: 650
      });
    });
  });

  describe('CART_ACTION.FETCH_FAILURE', () => {
    it('CART_ACTION.FETCH_FAILURE should set up error flag', () => {
      expect(cartReducer(initialState, cartActionCreators.fetchItemsFailure())).toEqual({
        ...initialState,
        failure: true
      });
    });
  });

  describe('Unknown action', () => {
    it('Unknown action should do nothing', () => {
      expect(cartReducer(initialState, {type: 'weird'})).toEqual({
        ...initialState
      });
    });
  });
});