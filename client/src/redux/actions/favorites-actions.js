import { FAVORITES_ACTIONS } from '../action-types/favoritesActionTypes';

export const updateItems = {
  type: FAVORITES_ACTIONS.UPDATE_ITEMS
}

export const fetchItemsBegin = {
  type: FAVORITES_ACTIONS.FETCH_BEGINS
}

export const fetchItemsSuccess = {
  type: FAVORITES_ACTIONS.FETCH_SUCCESS
}

export const fetchItemsFailure = {
  type: FAVORITES_ACTIONS.FETCH_FAILURE
}
