import React from 'react'
import { hydrate } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import rootReducer from "./redux/reducers";
import {BrowserRouter} from "react-router-dom";
import './i18n';

export function Hydration() {
    if (typeof window !== 'undefined') {
        const preloadedState = window.__PRELOADED_STATE__
       // const i18nextInstance = window.__i18nextInstance__

        //console.log(i18nextInstance)

        delete window.__i18nextInstance__
        delete window.__PRELOADED_STATE__

        const store = createStore(rootReducer, preloadedState)
        hydrate(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>,
            document.getElementById('root')
        )
    }
}



