import { CART_ACTIONS } from '../action-types/cartActionTypes';

export const initialState = {
  size: 0,
  failure: false,
  items: [],
  orderPrice: 0
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ACTIONS.UPDATE_ITEMS:
        let orderPrice = 0;
        for (const item of action.items) {
          orderPrice += item.generalData.price * item.amount;
        }
        return {
          ...state,
          items: action.items,
          size: action.items.length,
          orderPrice
        }
    case CART_ACTIONS.FETCH_BEGINS:
      return {
        ...state,
        loading: true,
        size: 0
      }
    case CART_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        items: action.items,
        size: action.size,
        orderPrice: action.orderPrice
      }
    case CART_ACTIONS.FETCH_FAILURE:
      return {
        ...state,
        failure: true,
        error: action.error,
        size: 0
      }
    default:
      return state;
  }
};
