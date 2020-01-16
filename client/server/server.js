import path from 'path'
import Express from 'express'
import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from '../src/redux/reducers'
import App from '../src/App'
import {initReactI18next, I18nextProvider} from 'react-i18next'
import {renderToString} from 'react-dom/server'
import i18next from "i18next"
import i18nextMiddleware from 'i18next-express-middleware'
import Backend from 'i18next-sync-fs-backend'
import fs from 'fs';
import {StaticRouter} from 'react-router-dom';
import serialize from 'serialize-to-js';

i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .use(initReactI18next)
    .init(
        {
            initImmediate: false,
            react: {
                useSuspense: false,
                wait: false,
            },
            fallbackLng: 'en',
            load: 'languageOnly',
            debug: false,
            ns: ['translation'],
            defaultNS: 'translation',
            backend: {
                loadPath: path.resolve(__dirname, '../public/locales/{{lng}}/{{ns}}.json'),
                addPath: path.resolve(__dirname, '../public/locales/{{lng}}/{{ns}}.json'),
            },
        }
    );

const app = Express();
const port = 3001;
app.use(i18nextMiddleware.handle(i18next));
app.use('/static', Express.static(path.join(__dirname, '../build/static')))
app.use('/static', Express.static(path.join(__dirname, '../build-server/static')))
app.use('/locales', Express.static(path.join(__dirname, '../build/locales')))
app.get('/*', handleRender);

app.listen(port);


function handleRender(req, res) {
    const store = createStore(rootReducer);
    const context = {};
    console.log(req.i18n.getResourceBundle('en', 'translation'))
    console.log("req.i18n.getResourceBundle('en', 'translation')")
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <I18nextProvider i18n={req.i18n}>
                    <App/>
                </I18nextProvider>
            </StaticRouter>
        </Provider>
    );
    const preloadedState = store.getState();


    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }
        return res.send(
            data
                .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
                .replace('<script>',
                    `<script>
                      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
                        /</g,
                        '\\u003c'
                    )};
                      window.__i18nextInstance__ = ${JSON.stringify(
                        req.i18n
                            .getResourceBundle('en', 'translation'))
                        .replace(
                            /</g,
                            '\\u003c'
                        )};
                </script>
                <script>`)
        );
    });
}

