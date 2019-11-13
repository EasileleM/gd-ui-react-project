import { toast } from 'react-toastify';

import i18n from '../i18n';

export default function notificationSuccess(messageRu, messageEn, name) {
    if(i18n.language === 'ru') {
      (() => toast(name + messageRu, { type: toast.TYPE.INFO }))();
    } else {
      (() => toast(name + messageEn, { type: toast.TYPE.INFO }))();
    }
};