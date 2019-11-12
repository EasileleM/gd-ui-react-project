import * as cartActions from '../actions/cart-actions';

export const openCart = () => {
  return cartActions.openCart;
}

export const closeCart = () => {
  return cartActions.closeCart;
}

export const addItem = (item) => {
  return {...cartActions.addItem, item};
}

export const removeItem = (item) => {
  return {...cartActions.removeItem, item};
}

export const fetchItemsBegin = () => {
  return cartActions.fetchItemsBegin;
}

export const fetchItemsSuccess = (items) => {
  return {...cartActions.fetchItemsSuccess, items};
}

export const fetchItemsFailure = (error) => {
  return {...cartActions.fetchItemsFailure, error};
}
