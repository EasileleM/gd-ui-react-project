import { signInFetch } from "../../../utils/signInFetch";
import { setItems as setCartItems } from "../cart/setItems";
import { setItems as setFavoritesItems } from "../favorites/setItems";
import notificationSuccess from '../../../utils/notificationSuccess';
import { closeModalWindow } from '../modalWindow/actions';
import { beginSignIn, successSignIn, failureSignIn } from './actions';
import i18n from '../../../i18n'

export function signIn(data) {
  return (dispatch) => {
    dispatch(beginSignIn());
    signInFetch(data)
      .then((res) => {

          i18n.changeLanguage(res.data.info.lang);//todo refactor it to it's own i18n reducer
          document.cookie = `i18nextLang=${res.data.info.lang}`;
          document.location.reload();

        notificationSuccess('Добро пожаловать!', 'Welcome!', '');
        dispatch(successSignIn(res.data.info));
        dispatch(setCartItems(res.data.cartItems));
        dispatch(setFavoritesItems(res.data.favoritesItems));
        dispatch(closeModalWindow());
      })
      .catch((err) => {
        if (err.response.status === 403) {
          notificationSuccess('Неправильный пароль или почта', 'Wrong password or email.', '');
          dispatch(failureSignIn(403));
          return;
        }
        dispatch(failureSignIn(500));
        notificationSuccess('У нас возникли проблемы на сервере, попробуйте повторить позже.',
          'We have troubles on our server, please try again later.', '');
      });
  };
}
