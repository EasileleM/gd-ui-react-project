import { FAVORITES_ACTIONS } from './types';

export const openFavorites = {
  type: FAVORITES_ACTIONS.OPEN
};

export const closeFavorites = {
  type: FAVORITES_ACTIONS.CLOSE
};

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
