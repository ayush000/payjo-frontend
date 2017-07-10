// Entry point
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

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
    <LocaleProvider locale={enUS}>
      <BrowserRouter>
        <AppContainer>
          <AppComponent />
        </AppContainer>
      </BrowserRouter>
    </LocaleProvider>
  </Provider>
)

render(wrapClientApp(Routes), rootEl)
// Hot Module Replacement
if (module.hot) {
  module.hot.accept('./Routes', () => {
    const NextApp = require('./Routes').default
    render(wrapClientApp(NextApp), rootEl)
  })
}

registerServiceWorker()
