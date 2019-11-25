import { updateItems as updateItemsActionCreator } from '../../action-creators/favorites-action-creator';

import updateLocalStorageCollection from '../../../utils/localStorage/updateLocalStorageCollection';
import notificationSuccess from '../../../utils/notificationSuccess';

export default function addItem(itemToAdd) {
  return (dispatch, getState) => {
    const currentItems = getState().favoritesController.items.slice();
    const currentCollection = {};
    if (currentItems.find((item) => item._id === itemToAdd._id)) {
      return;
    }
    notificationSuccess(' успешно добавлено в избранное', ' has been added to favorites', itemToAdd.name);
    for (const item of currentItems) {
      currentCollection[item._id] = true;
    }
    currentCollection[itemToAdd._id] = true;
    currentItems.push(itemToAdd);
    dispatch(updateItemsActionCreator(currentItems));
    updateLocalStorageCollection('FavoritesItems', currentCollection);
  };
}