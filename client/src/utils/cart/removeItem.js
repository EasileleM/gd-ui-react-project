import { updateItems as updateItemsActionCreator } from '../../store/cart/cart-actions/cart-action-creator';

import updateLocalStorageCollection from '../localStorage/updateLocalStorageCollection';

export default function removeItem(state, target) {
  return dispatch => {
    const currentItems = state.cartController.items.slice();
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
    dispatch(updateItemsActionCreator(currentItems));
    updateLocalStorageCollection('CartItems', currentCollection);
  };
}