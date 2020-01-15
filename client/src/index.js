import React from 'react'
import { hydrate } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import rootReducer from "./redux/reducers";
//import  "./i18n";

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
        }, () => {
            const preloadedState = window.__PRELOADED_STATE__

            delete window.__PRELOADED_STATE__

            const store = createStore(rootReducer, preloadedState)
            hydrate(
                <Provider store={store}>
                    <App />
                </Provider>,
                document.getElementById('root')
            )
        });


