import { updateUserCart } from '../../../utils/updateUserCart';

import { setItems } from './setItems';

export default function removeItem(target) {
  return (dispatch, getState) => {
    const currentItems = getState().cartController.items.slice();
    const currentCollection = {};
    for (let i = 0; i < currentItems.length; i++) {
      if (currentItems[i].generalData._id === target.generalData._id
        && currentItems[i].color === target.color
        && currentItems[i].size === target.size) {
          currentItems.splice(i--, 1);
          continue;
      }
      if (!currentCollection[currentItems[i].generalData._id]) {
        currentCollection[currentItems[i].generalData._id] = [];
      }
      currentCollection[currentItems[i].generalData._id]
        .push({ size: currentItems[i].size, color: currentItems[i].color, amount: currentItems[i].amount });
    }
    updateUserCart(currentCollection)
      .then(() => {
        dispatch(setItems(currentItems));
      })
      .catch((err) => {
        //TODO notify about cart error or do something another
      });
  };
}