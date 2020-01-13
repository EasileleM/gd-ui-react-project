import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import axios from 'axios';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        react: {
            useSuspense: false,
        },
        backend: {
            ajax: axios,
        },
        fallbackLng: 'en',
    });

export default i18n;