import * as fatoritesActions from '../actions/favorites-actions';

export const openFavorites = () => {
  return fatoritesActions.openFavorites;
}

export const closeFavorites = () => {
  return fatoritesActions.closeFavorites;
}

export const updateItems = (items) => {
  return {...fatoritesActions.updateItems, items};
}

export const fetchItemsBegin = () => {
  return fatoritesActions.fetchItemsBegin;
}

export const fetchItemsSuccess = (items, size) => {
  return {...fatoritesActions.fetchItemsSuccess, items, size};
}

export const fetchItemsFailure = (error) => {
  return {...fatoritesActions.fetchItemsFailure, error};
}
