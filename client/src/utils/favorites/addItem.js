import { updateItems as updateItemsActionCreator } from '../../store/favourites/favourites-actions/favorites-action-creator';

import updateLocalStorageCollection from '../localStorage/updateLocalStorageCollection';
import notificationSuccess from '../notificationSuccess';

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
    notificationSuccess(' успешно добавлено в избранное', ' has been added to favorites', itemToAdd.name);
  };
}