import { updateUserCart } from '../../../utils/updateUserCart';

import { setItems } from './setItems';

export default function removeItem(target) {
  return (dispatch, getState) => {
    const currentItems = getState().cartController.items.slice();
    currentItems.splice(currentItems.findIndex((item) => {
      return item.generalData._id === target.generalData._id
        && item.color === target.color
        && item.size === target.size;
    }), 1);

    const currentItemsToServer = currentItems.filter((item) => {
      return {
        size: item.size,
        color: item.color,
        amount: item.amount,
        _id: item.generalData._id
      }
    });

    updateUserCart(currentItemsToServer)
      .then(() => {
        dispatch(setItems(currentItems));
      })
      .catch((err) => {
        //TODO notify about cart error or do something another
      });
  };
}