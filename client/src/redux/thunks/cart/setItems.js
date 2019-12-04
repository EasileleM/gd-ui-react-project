import { updateItems } from '../../action-creators/cart-action-creator';

export default function setItems(items) {
  return async (dispatch) => {
    let cartSize = 0;
    let orderPrice = 0;
    for (const item of items) {
      cartSize++;
      orderPrice += item.generalData.price * item.amount;
    }
    dispatch(updateItems(items, cartSize, orderPrice));
  };
}
