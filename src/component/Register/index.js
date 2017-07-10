import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button } from 'antd'

import { register } from '../../action'
import { tokenKey } from '../../constants'

const hasErrors = (fieldsError) =>
  Object.keys(fieldsError).some(field => fieldsError[field])

const mapStateToProps = state => ({ ...state.auth })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ register }, dispatch),
})

class Register extends Component {
  static propTypes = {
    form: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    inProgress: PropTypes.bool.isRequired,
    error: PropTypes.string,
    history: PropTypes.object,
    token: PropTypes.string.isRequired,
  }

  async componentDidMount() {
    // To disabled submit button at the beginning.
    try {
      await this.validateFields()
    } catch (error) {
    }
  }

  componentDidUpdate() {
    if (window.localStorage.getItem(tokenKey)) {
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

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const values = await this.validateFields()
      await this.props.actions.register({ user: values })
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
          Register
        </h1>
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
              Register
          </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Register))
