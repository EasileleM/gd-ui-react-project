import { CART_ACTIONS } from '../actions/types';
import addItem from '../utils/cart/addItem';
import removeItem from '../utils/cart/removeItem';
import changeItem from '../utils/cart/changeItem';

const initialState = {
  size: 0,
  opened: false,
  loading: false,
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
    case CART_ACTIONS.ADD_ITEM:
      return addItem(state, action.item);
    case CART_ACTIONS.CHANGE_ITEM:
      return changeItem(state, action.item);
    case CART_ACTIONS.REMOVE_ITEM:
      return removeItem(state, action.item);
    case CART_ACTIONS.FETCH_BEGINS:
    case CART_ACTIONS.FETCH_SUCCESS:
    case CART_ACTIONS.FETCH_FAILURE:
    default:
      return state;
  }
};

export default cartReducer;