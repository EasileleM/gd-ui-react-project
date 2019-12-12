import { changeUserInfoFetch } from "../../../utils/signInFetch";
import notificationSuccess from '../../../utils/notificationSuccess';
import { userAuthorize } from './actions';

export function signIn(data) {
  return (dispatch) => {
    changeUserInfoFetch(data)
      .then(() => {
        notificationSuccess('Информация была успешно изменена!', 'Information has succefully changed!', '');
        dispatch(userAuthorize(data));
      })
      .catch((err) => {
        if (err.response.status === 403) {
          notificationSuccess('Неправильный пароль', 'Wrong password', '');
          return;
        }
        if (err.response.status === 409) {
          dispatch(failureSignUp(409));
          notificationSuccess('Такая почта уже используется.', 'Such email has already been used.', '');
          return;
        }
        notificationSuccess('У нас возникли проблемы на сервере, попробуйте повторить позже.',
          'We have troubles on out server, please try again later.', '');
      });
  };
}
