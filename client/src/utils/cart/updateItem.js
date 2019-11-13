import { updateItems as updateItemsActionCreator } from '../../action-creators/cart-action-creator';

import updateLocalStorageCollection from '../localStorage/updateLocalStorageCollection';
import notificationSuccess from '../notificationSuccess';

export default function updateItem(state, target, color, size, amount) {
  return dispatch => {
    const currentItems = state.cartController.items.slice();
    const currentCollection = {};

    const bucketChanged = target.color !== color || target.size !== size;
    let targetUpdated = false;

    for (let i = 0; i < currentItems.length; i++) {
      if (currentItems[i].generalData._id === target.generalData._id) {
        if (bucketChanged && currentItems[i].color === target.color
          && currentItems[i].size === target.size) {
          currentItems.splice(i--, 1);
          continue;
        }
        else if (currentItems[i].color === color
          && currentItems[i].size === size) {
          currentItems[i].amount =
            bucketChanged ? Number(currentItems[i].amount) + Number(amount) : Number(amount);
          targetUpdated = true;
        }
      }
      if (!currentCollection[currentItems[i].generalData._id]) {
        currentCollection[currentItems[i].generalData._id] = [];
      }
      currentCollection[currentItems[i].generalData._id]
        .push({ size: currentItems[i].size, color: currentItems[i].color, amount: currentItems[i].amount });
    }

    if (!targetUpdated) {
      if (!currentCollection[target.generalData._id]) {
        currentCollection[target.generalData._id] = [];
      }
      currentCollection[target.generalData._id]
        .push({ size, color, amount });
    }

    dispatch(updateItemsActionCreator(currentItems));
    updateLocalStorageCollection('CartItems', currentCollection);
  };
}