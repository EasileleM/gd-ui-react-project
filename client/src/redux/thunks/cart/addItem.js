import { updateUserCart } from '../../../utils/updateUserCart';

import { setItems } from './setItems';

import notificationSuccess from '../../../utils/notificationSuccess';

export default function addItem(itemToAdd, color, size, amount = 1) {
  return (dispatch, getState) => {
    if (Number(amount) <= 0) { //TODO thunk is too big
      return;
    }
    const currentItems = getState().cartController.items.slice();
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
    updateUserCart(currentCollection)
      .then(() => {
        notificationSuccess(' успешно добавлено в корзину', ' has been added to cart', itemToAdd.name); //TODO dispatch it
        dispatch(setItems(currentItems));
      })
      .catch((err) => {
        //TODO notify about cart error or do something another
      });
  };
}