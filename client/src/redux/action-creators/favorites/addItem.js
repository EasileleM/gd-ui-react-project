import {updateUserFavorites} from '../../../utils/updateUserFavorites';
import notificationSuccess from '../../../utils/notificationSuccess';

import {setItems} from './setItems';

export function addItem(itemToAdd) {
  return (dispatch, getState) => {
    const currentItems = getState().favoritesController.items.slice();
    if (currentItems.find((item) => item._id === itemToAdd._id)) {
      return;
    }
    currentItems.push(itemToAdd);

    const currentItemsToServer = currentItems.map((item) => {
      return {
        _id: item._id
      }
    });
    dispatch(setItems(currentItems));
    updateUserFavorites(currentItemsToServer)
        .then(() => {
          notificationSuccess(' успешно добавлено в избранное', ' has been added to favorites', itemToAdd.name); //TODO dispatch it
        })
        .catch((err) => {
          //TODO notify about cart error or do something another
        });
  };
}