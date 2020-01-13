import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../src/redux/reducers'
import App from '../src/App'
import { renderToString } from 'react-dom/server'
const app = Express()
const port = 3001
//Serve static files
app.use('/static', Express.static('static'))
app.use(handleRender)
function handleRender(req, res) {
    const store = createStore(rootReducer)
    const html = renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    )
    const preloadedState = store.getState()
    res.send(renderFullPage(html, preloadedState))
}
function renderFullPage(html, preloadedState) {
    //TODO: WARNING POSSIBLE PLACE FOR XSS ATTACKS
    return `
    <!doctype html>
    <html lang="en">
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
        /</g,
        '\\u003c'
    )}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}
app.listen(port)