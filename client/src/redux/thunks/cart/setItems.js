import { updateItems } from '../../action-creators/cart-action-creator';

export function setItems(items) {
  return async (dispatch) => {
    let cartSize = items.length;
    let orderPrice = 0;
    for (const item of items) {
      orderPrice += item.generalData.price * item.amount;
    }
    dispatch(updateItems(items, cartSize, orderPrice));
  };
}
