import { fetchItemsBegin, fetchItemsSuccess, fetchItemsFailure } from '../../action-creators/favorites-action-creator';
import { loadIdArray } from '../../utils/loadIdArray';

import getLocalStorageCollection from '../localStorage/getLocalStorageCollection';
import updateLocalStorageCollection from '../localStorage/updateLocalStorageCollection';

export default function fetchItems() {
  return dispatch => {
    dispatch(fetchItemsBegin());
    const storage = getLocalStorageCollection('FavoritesItems');
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
        updateLocalStorageCollection('FavoritesItems', storage);
        dispatch(fetchItemsSuccess(result.data.items));
      })
      .catch(error => dispatch(fetchItemsFailure(error)));
  };
}