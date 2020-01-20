import i18next from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import {Hydration} from './index'
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
                loadPath: '/locales/{{lng}}/{{ns}}.json'
            },
            fallbackLng: 'en',
            load: 'languageOnly',
            ns: ['translation'],
            defaultNS: 'translation',
            debug: false,
        }, () => {
            if(typeof window !== "undefined")
            {
                document.cookie = `i18nextLang=${i18next.language}`;
                Hydration();
            }
        });


export default i18next