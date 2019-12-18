import { setItems as setCartItems } from "../cart/setItems";
import { setItems as setFavoritesItems } from "../favorites/setItems";
import notificationSuccess from '../../../utils/notificationSuccess';
import { logoutFetch } from '../../../utils/logoutFetch';
import { closeModalWindow } from '../modalWindow/actions';
import { beginLogout, successLogout, failureLogout } from './actions';

export function logout() {
  return (dispatch) => {
    dispatch(beginLogout());
    logoutFetch()
      .then(() => {
        notificationSuccess('Вы успешно вышли со своего профиля!', 'Logout successfully', '');
        dispatch(successLogout());
        dispatch(setCartItems([]));
        dispatch(setFavoritesItems([]));
        dispatch(closeModalWindow());
      })
      .catch(() => {
        dispatch(failureLogout());
        notificationSuccess('У нас возникли проблемы на сервере, попробуйте повторить позже.',
          'We have troubles on our server, please try again later.', '');
      });
  };
}