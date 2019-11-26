import * as favoritesActions from '../actions/favorites-actions';

export const updateItems = (items) => {
  return {...favoritesActions.updateItems, items};
}

export const fetchItemsBegin = () => {
  return favoritesActions.fetchItemsBegin;
}

export const fetchItemsSuccess = (items, size) => {
  return {...favoritesActions.fetchItemsSuccess, items, size};
}

export const fetchItemsFailure = (error) => {
  return {...favoritesActions.fetchItemsFailure, error};
}
