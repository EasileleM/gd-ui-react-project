import { CART_ACTIONS } from './types';

export const openCart = {
  type: CART_ACTIONS.OPEN
};

export const closeCart = {
  type: CART_ACTIONS.CLOSE
};

export const updateItems = {
  type: CART_ACTIONS.UPDATE_ITEMS
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
