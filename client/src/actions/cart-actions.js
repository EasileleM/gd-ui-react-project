import { CART_ACTIONS } from './types';

export const openCart = {
  type: CART_ACTIONS.OPEN
};

export const closeCart = {
  type: CART_ACTIONS.CLOSE
};

export const addItem = {
  type: CART_ACTIONS.ADD_ITEM
}

export const removeItem = {
  type: CART_ACTIONS.REMOVE_ITEM
}

export const changeItem = {
  type: CART_ACTIONS.CHANGE_ITEM
}

export const fetchItemsBegin = {
  type: CART_ACTIONS.FETCH_BEGINS
}

export const fetchItemsSuccess = {
  type: CART_ACTIONS.FETCH_SUCCESS
}

export const fetchItemsFailure = {
  type: CART_ACTIONS.FETCH_FAILURE
}
