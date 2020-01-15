import i18next from "i18next";
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from "react-i18next";
import axios from 'axios';

i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(
        {
            react: {
                useSuspense: false,
                wait: false,
            },
            backend: {
                ajax: axios,
            },
            lng: 'en',
            fallbackLng: 'en',
            load: 'languageOnly',
            ns: ['translation'],
            defaultNS: 'translation',
            debug: true,
        });

export default i18next;