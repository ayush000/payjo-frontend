import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

import configureStore, { sagaMiddleware } from './configureStore'
import saga from './saga'
import Routes from './Routes'
import './index.css'

import registerServiceWorker from './registerServiceWorker'

const store = configureStore()
sagaMiddleware.run(saga)
const rootEl = document.getElementById('root')
const wrapClientApp = AppComponent => (
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </BrowserRouter>
  </Provider>
)

render(wrapClientApp(Routes), rootEl)
// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Routes', () => {
    const NextApp = require('./Routes').default
    render(wrapClientApp(NextApp), rootEl)
  })
}

registerServiceWorker()
