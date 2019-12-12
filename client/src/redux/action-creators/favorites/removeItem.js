import { setItems } from './setItems';
import { updateUserFavorites } from '../../../utils/updateUserFavorites';

export function removeItem(target) {
  return (dispatch, getState) => {
    const currentItems = getState().favoritesController.items.slice();

    currentItems.splice(currentItems.findIndex((item) => {
      return item._id === target._id;
    }), 1);


    const currentItemsToServer = currentItems.map((item) => {
      return {
        _id: item._id
      }
    });

    dispatch(setItems(currentItems));

    updateUserFavorites(currentItemsToServer); //todo notifications
  };
}
