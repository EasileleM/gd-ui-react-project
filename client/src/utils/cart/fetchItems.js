import { fetchItemsBegin, fetchItemsSuccess, fetchItemsFailure } from '../../store/cart/cart-actions/cart-action-creator';
import { loadIdArray } from '../../utils/loadIdArray';

import getLocalStorageCollection from '../localStorage/getLocalStorageCollection';
import updateLocalStorageCollection from '../localStorage/updateLocalStorageCollection';


export default function fetchItems() {
  return dispatch => {
    dispatch(fetchItemsBegin());
    const storage = getLocalStorageCollection('CartItems');
    if (!storage) {
      dispatch(fetchItemsSuccess([]));
      return;
    }
    const ids = Object.keys(storage);
    return loadIdArray(ids)
      .then(result => {
        for (const id of result.data.rejectedId) {
          delete storage[id];
        }
        updateLocalStorageCollection('CartItems', storage);
        let cartSize = 0;
        let orderPrice = 0;
        const resultItems = [];
        result.data.items.forEach((item) => {
          for (const configuratedItem of storage[item._id]) {
            cartSize++;
            orderPrice += item.price * configuratedItem.amount;
            resultItems.push({
              generalData: item,
              color: configuratedItem.color,
              size: configuratedItem.size,
              amount: configuratedItem.amount
            });
          }
        });
        dispatch(fetchItemsSuccess(resultItems, cartSize, orderPrice));
      })
      .catch(error => dispatch(fetchItemsFailure(error)));
  };
}