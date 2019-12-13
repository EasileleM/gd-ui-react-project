import { changeUserInfoFetch } from "../../../utils/changeUserInfoFetch";
import notificationSuccess from '../../../utils/notificationSuccess';
import { userAuthorize } from './actions';

export function changeInfo(data) {
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
          notificationSuccess('Такая почта уже используется.', 'Such email has already been used.', '');
          return;
        }
        notificationSuccess('У нас возникли проблемы на сервере, попробуйте повторить позже.',
          'We have troubles on our server, please try again later.', '');
      });
  };
}
