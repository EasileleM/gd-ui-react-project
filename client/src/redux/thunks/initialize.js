import { setItems as setCartItems } from './cart/setItems';
import { userAuthorize } from '../action-creators/user-action-creator';
import { getAuthentificationInfo } from '../../utils/getAuthentificationInfo';
/**
 * initialize state of app
 */
// TODO move all initial state creators here
export function initialize() {
  return (dispatch) => {
    getAuthentificationInfo()
      .then((data) => {
        dispatch(userAuthorize(data.user.info));
        dispatch(setCartItems(data.user.cartItems));
      });
  };
}
