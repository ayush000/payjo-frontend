import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'

import { tokenKey } from './constants'
import Login from './component/Login'
import Register from './component/Register'
import ProductTable from './component/ProductTable'

// If token is present, set authorization header in root component,
// so any component rendered will lead to header being set
if (window.localStorage.getItem(tokenKey)) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem(tokenKey)
}

class Routes extends Component {
  render() {
    return (
      <div style={{ width: '60%', margin: 'auto' }}>
        <Route path="/" exact component={ProductTable} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>)
  }
}
export default Routes
