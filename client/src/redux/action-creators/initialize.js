import { setItems as setCartItems } from './cart/setItems';
import { setItems as setFavoritesItems } from './favorites/setItems';
import { userAuthorize } from './user/actions';
import { getAuthentificationInfo } from '../../utils/getAuthentificationInfo';
import { interceptorInit } from '../../utils/interceptorResponse';
/**
 * initialize state of app
 */
// TODO move all initial state creators here
export function initialize() {
  return (dispatch) => {
    interceptorInit();
    getAuthentificationInfo()
      .then((data) => {
        if (data.info) {
          dispatch(userAuthorize(data.info));
        }
        dispatch(setCartItems(data.cartItems));
        dispatch(setFavoritesItems(data.favoritesItems));
      });
  };
}
