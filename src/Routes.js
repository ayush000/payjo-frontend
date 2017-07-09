import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { tokenKey } from './constants'
import Login from './component/Login'
import Register from './component/Register'
import ProductTable from './component/ProductTable'
import { setToken } from './action'

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setToken }, dispatch),
})


class Routes extends Component {
  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
  }

  componentWillMount() {
    const token = window.localStorage.getItem(tokenKey)
    if (token) {
      this.props.actions.setToken(token)
    }
  }

  render() {
    return (
      <div style={{ width: '60%', margin: 'auto' }}>
        <Route path="/" exact component={ProductTable} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>)
  }
}
export default connect(null, mapDispatchToProps)(Routes)
