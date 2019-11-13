import { updateItems as updateItemsActionCreator } from '../../action-creators/cart-action-creator';

import updateLocalStorageCollection from '../localStorage/updateLocalStorageCollection';
import notificationSuccess from '../notificationSuccess';

export default function addItem(state, itemToAdd, color, size, amount = 1) {
  return dispatch => {
    if (Number(amount) <= 0) {
      return;
    }
    const currentItems = state.cartController.items.slice();
    const currentCollection = {};
    let itemAlreadyAdded = false;
    for (const item of currentItems) {
      if (item.generalData._id === itemToAdd._id
        && item.color === color
        && item.size === size) {
        itemAlreadyAdded = true;
        item.amount += amount;
      }
      if (!currentCollection[item.generalData._id]) {
        currentCollection[item.generalData._id] = [];
      }
      currentCollection[item.generalData._id].push({ size: item.size, color: item.color, amount: item.amount });
    }
    if (!itemAlreadyAdded) {
      if (!currentCollection[itemToAdd._id]) {
        currentCollection[itemToAdd._id] = [];
      }
      currentCollection[itemToAdd._id].push({ size, color, amount });
      currentItems.push({ generalData: itemToAdd, size, color, amount });
    }
    dispatch(updateItemsActionCreator(currentItems));
    updateLocalStorageCollection('CartItems', currentCollection);
    notificationSuccess(' успешно добавлено в корзину', ' has been added to cart', itemToAdd.name);
  };
}