import { updateItems as updateItemsActionCreator } from '../../action-creators/favorites-action-creator';

import { updateUserFavorites } from '../../../utils/updateUserFavorites';
import notificationSuccess from '../../../utils/notificationSuccess';

import { setItems } from './setItems';

export function addItem(itemToAdd) {
  return (dispatch, getState) => {
    const currentItems = getState().favoritesController.items.slice();
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
    updateUserFavorites(currentCollection)
      .then(() => {
        notificationSuccess(' успешно добавлено в избранное', ' has been added to favorites', itemToAdd.name); //TODO dispatch it
        dispatch(setItems(currentItems));
      })
      .catch((err) => {
        //TODO notify about cart error or do something another
      });
  };
}