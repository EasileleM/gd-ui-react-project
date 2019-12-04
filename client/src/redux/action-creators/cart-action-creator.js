import * as cartActions from '../actions/cart-actions';

export const updateItems = (items) => {
  return {...cartActions.updateItems, items};
}

export const fetchItemsBegin = () => {
  return {...cartActions.fetchItemsBegin};
}

export const fetchItemsSuccess = (items, size, orderPrice) => {
  return {...cartActions.fetchItemsSuccess, items, size, orderPrice};
}

export const fetchItemsFailure = (error) => {
  return {...cartActions.fetchItemsFailure, error};
}
