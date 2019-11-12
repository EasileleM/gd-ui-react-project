import { CART_ACTIONS } from '../actions/types';
import addItem from '../utils/cart/addItem';
import removeItem from '../utils/cart/removeItem';
import changeItem from '../utils/cart/changeItem';

const initialState = {
  size: 0,
  opened: false,
  loading: false,
  failure: false,
  items: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ACTIONS.OPEN:
      return {
        ...state,
        opened: true
      }
    case CART_ACTIONS.CLOSE:
      return {
        ...state,
        opened: false
      }
    case CART_ACTIONS.UPDATE_ITEMS:
        return {
          ...state,
          items: action.items,
          size: action.items.length
        }
    case CART_ACTIONS.FETCH_BEGINS:
      return {
        ...state,
        opened: false,
        loading: true,
        size: 0
      }
    case CART_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        items: action.items,
        size: action.size,
        orderPrice: action.orderPrice,
        loading: false
      }
    case CART_ACTIONS.FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        failure: true,
        error: action.error,
        size: 0
      }
    default:
      return state;
  }
};

export default cartReducer;