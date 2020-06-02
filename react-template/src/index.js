import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './views/App'
import store from './store'
import 'antd-mobile/dist/antd-mobile.css'
import GlobalStyle from './styled'
import './api/http'

const renderDom = document.getElementById('root')
const AppComponent = () => (
  <Provider store={store}>
    <Fragment>
      <GlobalStyle />
      <App />
    </Fragment>
  </Provider>
)

ReactDOM.render(<AppComponent />, renderDom)
