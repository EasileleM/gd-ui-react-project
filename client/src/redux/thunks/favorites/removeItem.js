import { setItems } from './setItems';
import { updateUserFavorites } from '../../../utils/updateUserFavorites';

export function removeItem(target) {
  return (dispatch, getState) => {
    const currentItems = getState().favoritesController.items.slice();

    currentItems.splice(currentItems.find((item) => {
      return item._id === target._id;
    }))

    const currentItemsToServer = currentItems.filter((item) => {
      return {
        _id: item.generalData._id
      }
    });

    updateUserFavorites(currentItemsToServer)
      .then(() => {
        dispatch(setItems(currentItems));
      })
      .catch((err) => {
        //TODO notify about cart error or do something another
      });
  };
}
