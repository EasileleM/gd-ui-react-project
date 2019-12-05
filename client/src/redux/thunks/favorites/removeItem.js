import { updateItems as updateItemsActionCreator } from '../../action-creators/favorites-action-creator';

import { setItems } from './setItems';
import { updateUserFavorites } from '../../../utils/updateUserFavorites';

export function removeItem(target) {
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
    updateUserFavorites(currentCollection)
      .then(() => {
        dispatch(setItems(currentItems));
      })
      .catch((err) => {
        //TODO notify about cart error or do something another
      });
  };
}