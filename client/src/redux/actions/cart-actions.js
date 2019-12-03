import { CART_ACTIONS } from '../action-types/cartActionTypes';

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
