import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd'
import axios from 'axios'

import { login } from '../../action'
import { tokenKey } from '../../constants'

const hasErrors = (fieldsError) =>
  Object.keys(fieldsError).some(field => fieldsError[field])

const mapStateToProps = state => ({ ...state.auth })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ login }, dispatch),
})


class Login extends Component {
  static propTypes = {
    form: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    inProgress: PropTypes.bool.isRequired,
    error: PropTypes.string,
    token: PropTypes.string.isRequired,
    history: PropTypes.object,
  }

  async componentDidMount() {
    // To disable submit button at the beginning.
    try {
      await this.validateFields()
    } catch (error) {
    }
  }

  componentDidUpdate() {
    // For every update in props, it checks whether localStorage has token
    // And redirects to /
    if (window.localStorage.getItem(tokenKey)) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem(tokenKey)
      this.props.history.push('/')
    }
  }

  validateFields = () => {
    return new Promise((resolve, reject) => {
      this.props.form.validateFields((err, values) => {
        if (err) return reject(err)
        resolve(values)
      })
    })
  }
// Dispatch login action after fields are validated
  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const values = await this.validateFields()
      await this.props.actions.login({ user: values })
    } catch (err) {
      console.log(err)
      alert(JSON.stringify(err))
    }
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form
    const FormItem = Form.Item
    const emailError = isFieldTouched('email') && getFieldError('email')
    const passwordError = isFieldTouched('password') && getFieldError('password')

    return (
      <div>
        <h1>
          Login
        </h1>
        {/*if error is present in props, create a div with error message*/}
        {this.props.error ?
          <div style={{ color: 'red' }}>{this.props.error}</div>
          : null}
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="Email"
            validateStatus={emailError ? 'error' : ''}
            help={emailError || ''}
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not a valid email!',
              }, { required: true, message: 'Please input your email!' }],
            })(
              <Input prefix={<Icon type="user" />} placeholder="abc@xyz.com" />
              )}
          </FormItem>
          <FormItem
            label="Password"
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />
              )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError()) || this.props.inProgress}
            >
              Log in
          </Button>
            <br />
            <Link to="/register">New user? register now!</Link>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login))
