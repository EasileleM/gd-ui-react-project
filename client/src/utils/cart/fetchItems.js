import { fetchItemsBegin, fetchItemsSuccess, fetchItemsFailure } from '../../action-creators/cart-action-creator';
import { loadIdArray } from '../../utils/loadIdArray';

import getLocalStorageCollection from '../localStorage/getLocalStorageCollection';

export default function fetchItems() {
  return dispatch => {
    dispatch(fetchItemsBegin());
    const storage = getLocalStorageCollection('CartItems');
    if (!storage) {
      dispatch(fetchItemsSuccess(null));
      return;
    }
    const ids = Object.keys(storage);
    return loadIdArray(ids)
      .then(result => {
        for (const id of result.data.rejectedId) {
          delete storage[id];
        }
        localStorage.setItem('CartItems', JSON.stringify(storage));
        let cartSize = 0;
        let orderPrice = 0;
        const resultItems = result.data.items.map((item) => {
          cartSize++;
          orderPrice += item.price * storage[item._id].amount;
          return {
            generalData: item,
            color: storage[item._id].color,
            size: storage[item._id].size,
            amount: storage[item._id].amount
          }
        })
        dispatch(fetchItemsSuccess(resultItems, cartSize, orderPrice));
      })
      .catch(error => dispatch(fetchItemsFailure(error)));
  };
}