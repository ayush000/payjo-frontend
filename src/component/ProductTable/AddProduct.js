import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DatePicker, Input, InputNumber, Modal, Button, Form } from 'antd'
import moment from 'moment'

import { createProduct } from '../../action'

const hasErrors = (fieldsError) =>
  Object.keys(fieldsError).some(field => fieldsError[field])

// const mapStateToProps = state => ({ ...state.product })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ createProduct }, dispatch),
})

class AddProduct extends Component {
  state = {
    showModal: false,
  }

  static propTypes = {
    form: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
  }

  async componentDidMount() {
    // To disabled submit button at the beginning.
    try {
      await this.validateFields()
    } catch (error) {
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

  showModal = () => {
    this.setState({ showModal: true })
  }

  hideModal = () => {
    this.setState({ showModal: false })
  }

  // handleCodeChange = e => {
  //   const finalCode = e.target.value.toUpperCase().trim()
  //   console.log(finalCode)
  //   this.props.form.setFieldsValue({ code: finalCode })
  // }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.setState({ showModal: false })
    try {
      const values = await this.validateFields()
      values.expiry = values.expiry.format('YYYY-MM-DD')
      await this.props.actions.createProduct({ product: values })
    } catch (err) {
      console.log(err)
      alert(JSON.stringify(err))
    }
  }

  render() {
    const { showModal } = this.state
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form
    const FormItem = Form.Item
    const nameError = isFieldTouched('name') && getFieldError('name')
    // TODO: Code is controlled component
    const codeError = isFieldTouched('code') && getFieldError('code')

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add product
        </Button>
        <Modal title="Add product"
          visible={showModal}
          onCancel={this.hideModal}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label="Name"
              validateStatus={nameError ? 'error' : ''}
              help={nameError || ''}
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input product name!' }],
              })(
                <Input />
                )}
            </FormItem>
            <FormItem
              label="Code"
              validateStatus={codeError ? 'error' : ''}
              help={codeError || ''}
            >
              {getFieldDecorator('code', {
                rules: [{ required: true, message: 'Please input product code!' }],
              })(
                <Input />
                )}
            </FormItem>
            <FormItem
              label="Quantity"
            >
              {getFieldDecorator('quantity', {
                initialValue: 1, rules: [{ required: true, message: 'Please input product quantity!' }, {
                  type: 'number', message: 'The input is not a number',
                }],
              })(
                <InputNumber min={1} />
                )}
            </FormItem>
            <FormItem
              label="Expiry date"
            >
              {getFieldDecorator('expiry', {
                initialValue: moment(), rules: [{ required: true, message: 'Please input expiry date!' }],
              })(
                <DatePicker />
                )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                Submit
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Form.create()(AddProduct))
