import { signInFetch } from "../../../utils/signInFetch";
import { setItems as setCartItems } from "../cart/setItems";
import { setItems as setFavoritesItems } from "../favorites/setItems";
import notificationSuccess from '../../../utils/notificationSuccess';
import { closeModalWindow } from '../modalWindow/actions';
import { userAuthorize } from './actions';

export function signIn(data) {
  return (dispatch) => {
    signInFetch(data)
      .then((res) => {
        notificationSuccess('Добро пожаловать!', 'Welcome!', '');
        dispatch(userAuthorize(res.data.info));
        dispatch(setCartItems(res.data.cartItems));
        dispatch(setFavoritesItems(res.data.favoritesItems || []));
        dispatch(closeModalWindow());
      })
      .catch((err) => {
        // TODO better error notify
        notificationSuccess('Вот незадача...', 'Tough luck...', '');
      })
  };
}
