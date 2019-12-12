import { updateItems } from './actions';

export function setItems(items) {
  return async (dispatch) => {
    let cartSize = items.length;
    dispatch(updateItems(items, cartSize));
  };
}
