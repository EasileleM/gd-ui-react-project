import { setItems as setCartItems } from './cart/setItems';
import { userAuthorize } from '../action-creators/user-action-creator';
import { isAuth } from '../../utils/isAuth';
/**
 * initialize state of app
 */
export default function initialize() {
  return (dispatch) => {
    isAuth()
      .then((res) => {
        dispatch(userAuthorize(res.data.userInfo))
        dispatch(setCartItems(res.data.userCart))
      });
  };
}
