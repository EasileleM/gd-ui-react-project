import { CART_ACTIONS } from '../actions/types';
import notificationSuccess from '../../utils/notificationSuccess';

export const initialState = {
  size: 0,
  opened: false,
  loading: false,
  failure: false,
  items: [],
  orderPrice: 0
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ACTIONS.OPEN:
      if (!(!state.loading && !state.failure && state.size)) {
        notificationSuccess('Корзина пустая, вы не можете открыть её', 'Cart is empty, you can\'t open it', '')
      }
      return {
        ...state,
        opened: Boolean(!state.loading && !state.failure && state.size)
      }
    case CART_ACTIONS.CLOSE:
      return {
        ...state,
        opened: false
      }
    case CART_ACTIONS.UPDATE_ITEMS:
        let orderPrice = 0;
        for (const item of action.items) {
          orderPrice += item.generalData.price * item.amount;
        }
        return {
          ...state,
          items: action.items,
          size: action.items.length,
          orderPrice,
          opened: Boolean(state.opened && !state.loading && !state.failure && action.items.length)
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
