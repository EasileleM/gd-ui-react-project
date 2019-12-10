import { CART_ACTIONS } from '../action-creators/cart/actions';

export const initialState = {
  size: 0,
  failure: false,
  items: [],
  orderPrice: 0
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ACTIONS.UPDATE_ITEMS:
      return {
        ...state,
        items: action.items,
        size: action.size,
        orderPrice: action.orderPrice
      }
    default:
      return state;
  }
};
