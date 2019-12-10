import { setItems as setCartItems } from "../cart/setItems";
import { setItems as setFavoritesItems } from "../favorites/setItems";
import { userLogout } from "./actions";
import notificationSuccess from '../../../utils/notificationSuccess';
import { logoutFetch } from '../../../utils/logoutFetch';
import {closeModalWindow} from '../modalWindow/actions';

export function logout() {
  return (dispatch) => {
    logoutFetch()
      .then(() => {
        notificationSuccess('Вы успешно вышли со своего профиля!', 'Logout successfully', '');
        dispatch(setCartItems([]));
        dispatch(setFavoritesItems([]));
        dispatch(userLogout());
        dispatch(closeModalWindow());
      })
      .catch(() => {
        // TODO make better error notify
        notificationSuccess('Упс!', 'Woops!', '');
      });
  };
}