import { updateItems as updateItemsActionCreator } from '../../action-creators/favorites-action-creator';

import updateLocalStorageCollection from '../../../utils/localStorage/updateLocalStorageCollection';

export default function removeItem(target) {
  return (dispatch, getState) => {
    const currentItems = getState().favoritesController.items.slice();
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