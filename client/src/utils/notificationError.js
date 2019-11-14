import { toast } from 'react-toastify';

import i18n from '../i18n';

export default function notificationError(messageRu, messageEn, error) {
  const errCodes = error.message.match(/\d+/);
  if (errCodes) {
    const errorCode = errCodes[0];
    if (errorCode >= 400 && errorCode < 500) {
      if (i18n.language === 'ru') {
        (() => toast(messageRu, { type: toast.TYPE.ERROR }))();
      } else {
        (() => toast(messageEn, { type: toast.TYPE.ERROR }))();
      }
    } else if (errorCode >= 500 && errorCode < 600) {
      if (i18n.language === 'ru') {
        (() => toast('Сервер недоступен, попробуйте вернуться позднее.', { type: toast.TYPE.ERROR }))();
      } else {
        (() => toast('Server is not available, try to reconnect later.', { type: toast.TYPE.ERROR }))();
      }
    }
  }
}