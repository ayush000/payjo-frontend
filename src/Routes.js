import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'

import { tokenKey } from './constants'
import Login from './component/Login'
import Register from './component/Register'
import ProductTable from './component/ProductTable'

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
