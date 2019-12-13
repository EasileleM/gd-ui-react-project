import { signUpFetch } from "../../../utils/signUpFetch";
import { setItems as setCartItems } from "../cart/setItems";
import { setItems as setFavoritesItems } from "../favorites/setItems";
import notificationSuccess from '../../../utils/notificationSuccess';
import { closeModalWindow } from '../modalWindow/actions';
import { beginSignUp, successSignUp, failureSignUp } from './actions';

export function signUp(data) {
  return (dispatch) => {
    dispatch(beginSignUp());
    signUpFetch(data)
      .then((res) => {
        notificationSuccess('Добро пожаловать!', 'Welcome!', '');
        dispatch(successSignUp(res.data.info));
        dispatch(setCartItems(res.data.cartItems));
        dispatch(setFavoritesItems(res.data.favoritesItems || []));
        dispatch(closeModalWindow());
      })
      .catch((err) => {
        if (err.response.status === 409) {
          dispatch(failureSignUp(409));
          notificationSuccess('Такая почта уже используется.', 'Such email has already been used.', '');
          return;
        }
        if (err.response.status === 403) {
          dispatch(failureSignUp(403));
          notificationSuccess('Некорректные данные.', 'Incorrect data.', '');
          return;
        }
        dispatch(failureSignUp(500));
        notificationSuccess('У нас возникли проблемы на сервере, попробуйте повторить позже.',
          'We have troubles on out server, please try again later.', ''); // TODO weird handling, refactor!
      })
  };
}

