import { updateItems as updateItemsActionCreator } from '../../action-creators/favorites-action-creator';

import updateLocalStorageCollection from '../localStorage/updateLocalStorageCollection';

export default function addItem(state, itemToAdd) {
  return dispatch => {
    const currentItems = state.favoritesController.items.slice();
    const currentCollection = {};
    if (currentItems.find((item) => item._id === itemToAdd._id)) {
      return;
    }
    for (const item of currentItems) {
      currentCollection[item._id] = true;
    }
    currentCollection[itemToAdd._id] = true;
    currentItems.push(itemToAdd);
    dispatch(updateItemsActionCreator(currentItems));
    updateLocalStorageCollection('FavoritesItems', currentCollection);
  };
}