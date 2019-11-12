import { updateItems as updateItemsActionCreator } from '../../action-creators/favorites-action-creator';

import updateLocalStorageCollection from '../localStorage/updateLocalStorageCollection';

export default function removeItem(state, target) {
  return dispatch => {
    const currentItems = state.favoritesController.items.slice();
    const currentCollection = {};
    for (let i = 0; i < currentItems.length; i++) {
      if (currentItems[i]._id === target._id) {
          currentItems.splice(i--, 1);
          continue;
      }
      currentCollection[currentItems[i]._id] = true;
    }
    dispatch(updateItemsActionCreator(currentItems));
    updateLocalStorageCollection('FavoritesItems', currentCollection);
  };
}