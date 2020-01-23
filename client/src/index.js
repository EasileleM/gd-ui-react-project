import React from 'react'
import { render } from 'react-dom'
import {applyMiddleware, createStore} from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import rootReducer from "./redux/reducers";
import {BrowserRouter} from "react-router-dom";
import './i18n';
import thunk from "redux-thunk";
import {initialize} from "./redux/action-creators/initialize";

export function Hydration() {
    if (typeof window !== 'undefined') {
        const preloadedState = window.__PRELOADED_STATE__ ? window.__PRELOADED_STATE__ : {};

        delete window.__PRELOADED_STATE__;

        const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));
        store.dispatch(initialize());
        render(//todo interchange render and hydrate
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>,
            document.getElementById('root')
        )
        delete window.firstRender
    }
}



