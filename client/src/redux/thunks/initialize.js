import { setItems as setCartItems } from './cart/setItems';
import { setItems as setFavoritesItems } from './favorites/setItems';
import { userAuthorize } from '../action-creators/user-action-creator';
import { getAuthentificationInfo } from '../../utils/getAuthentificationInfo';
import { setInitSearchState } from '../../redux/action-creators/filter-action-creator';
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
        dispatch(userAuthorize(data.user.info));
        dispatch(setCartItems(data.user.cartItems));
        dispatch(setFavoritesItems(data.user.favoritesItems));
        dispatch(setInitSearchState());
      });
  };
}
