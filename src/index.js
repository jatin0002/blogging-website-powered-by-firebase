import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

import store, { rrfProps } from './store'
import App from './App'

// Styling imports
import './bootstrap.min.css'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
)
