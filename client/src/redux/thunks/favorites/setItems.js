import { updateItems } from '../../action-creators/favorites-action-creator';

export function setItems(items) {
  return async (dispatch) => {
    let cartSize = items.length;
    dispatch(updateItems(items, cartSize));
  };
}
