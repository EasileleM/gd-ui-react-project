import * as fatoritesActions from '../actions/favorites-actions';

export const openCart = () => {
  return fatoritesActions.openCart;
}

export const closeCart = () => {
  return fatoritesActions.closeCart;
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
