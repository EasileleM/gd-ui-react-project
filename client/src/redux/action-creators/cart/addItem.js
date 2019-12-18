import { updateUserCart } from '../../../utils/updateUserCart';

import { setItems } from './setItems';

import notificationSuccess from '../../../utils/notificationSuccess';

export default function addItem(itemToAdd, color, size, amount = 1) {
  return (dispatch, getState) => {
    if (Number(amount) <= 0) {
      return;
    }
    const currentItems = getState().cartController.items.slice();
    const targetItemIndex = currentItems.findIndex((item) => {
      return item.generalData._id === itemToAdd._id
        && item.color === color
        && item.size === size;
    });

    if (targetItemIndex >= 0) {
      if (currentItems[targetItemIndex].amount + 1 > 99) {
        notificationSuccess(' уже добавлен в корзину в максимальном количестве', ' has already been added in max quantity', itemToAdd.name);
        return;
      }
      currentItems[targetItemIndex].amount++;
    }
    else {
      currentItems.push({ generalData: itemToAdd, size, color, amount });
    }

    const currentItemsToServer = currentItems.map((item) => {
      return {
        size: item.size,
        color: item.color,
        amount: item.amount,
        _id: item.generalData._id
      }
    });
    notificationSuccess(' успешно добавлено в корзину', ' has been added to cart', itemToAdd.name); //TODO dispatch it
    dispatch(setItems(currentItems));
    updateUserCart(currentItemsToServer);
    //TODO handle fetch error
  };
}