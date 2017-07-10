import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Table, Input, InputNumber, DatePicker, Button } from 'antd'
import moment from 'moment'

import { getProducts, editRow, editRowCancel, saveRow, deleteRow } from '../../action'
import AddProduct from './AddProduct'
import { tokenKey } from '../../constants'

const mapStateToProps = state => ({ ...state.product, redirect: state.redirect })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getProducts, editRow, editRowCancel, saveRow, deleteRow }, dispatch),
})

class ProductTable extends Component {
  state = {
    modalVisible: false,
    rowsEditing: {},
  }

  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    redirect: PropTypes.bool.isRequired,
    history: PropTypes.object,
  }

  componentDidMount() {
    this.props.actions.getProducts()
  }

  componentDidUpdate() {
    if (this.props.redirect) {
      window.localStorage.setItem(tokenKey, '')
      this.props.history.push('/login')
    }
  }

  edit = (index, row) => {
    console.log(index)
    this.setState({ rowsEditing: { ...this.state.rowsEditing, [index]: row } })
    this.props.actions.editRow(index)
  }

  editCancel = (index) => {
    this.setState({ rowsEditing: { ...this.state.rowsEditing, [index]: null } })
    this.props.actions.editRowCancel(index)
  }

  editDone = (index) => {
    const product = this.state.rowsEditing[index]
    console.log(product)
    this.props.actions.saveRow({
      index,
      productId: product._id,
      product: {
        name: product.name,
        code: product.code,
        quantity: product.quantity,
        expiry: product.expiry,
      },
    })
  }

  delete = (productId, index) => {
    this.props.actions.deleteRow({ productId, index })
  }

  handleNameChange = (name, index) => {
    const selectedRow = this.state.rowsEditing[index]
    this.setState({
      rowsEditing: {
        ...this.state.rowsEditing,
        [index]: { ...selectedRow, name },
      },
    })
  }

  handleCodeChange = (code, index) => {
    const selectedRow = this.state.rowsEditing[index]
    ''.toUpperCase().trim()
    this.setState({
      rowsEditing: {
        ...this.state.rowsEditing,
        [index]: { ...selectedRow, code: code.toUpperCase().trim() },
      },
    })
  }

  handleQuantityChange = (quantity, index) => {
    console.log(quantity)
    console.log(!/^\d+$/g.test(quantity))
    if (/^\d+$/g.test(quantity)) {
      const selectedRow = this.state.rowsEditing[index]
      this.setState({
        rowsEditing: {
          ...this.state.rowsEditing,
          [index]: { ...selectedRow, quantity },
        },
      })
    }
  }

  handleExpiryChange = (expiry, index) => {
    console.log(expiry)
    const selectedRow = this.state.rowsEditing[index]
    this.setState({
      rowsEditing: {
        ...this.state.rowsEditing,
        [index]: { ...selectedRow, expiry },
      },
    })
  }

  logout = () => {
    console.log('Logging out')
    window.localStorage.setItem(tokenKey, '')
    this.props.history.push('/login')
  }

  render() {
    console.log(this.props.list)

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      render: (name, row, index) => {
        if (row.editing) {
          return (<Input value={this.state.rowsEditing[index].name} onChange={e => this.handleNameChange(e.target.value, index)} />)
        } else return name
      },
    }, {
      title: 'Code',
      dataIndex: 'code',
      render: (code, row, index) => {
        if (row.editing) {
          return (<Input value={this.state.rowsEditing[index].code} onChange={e => this.handleCodeChange(e.target.value, index)} />)
        } else return code
      },
    }, {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (qty, row, index) => {
        if (row.editing) {
          return (<InputNumber min={1} value={this.state.rowsEditing[index].quantity} onChange={value => this.handleQuantityChange(value, index)} />)
        }
        else {
          let color = 'green'
          if (qty < 10) {
            color = 'red'
          } else if (qty < 30) {
            color = 'orange'
          }
          return (<span style={{ color: color }}>{qty}</span>)
        }
      },
    }, {
      title: 'Expiry',
      dataIndex: 'expiry',
      render: (text, row, index) => {
        if (row.editing) {
          return (<DatePicker
            value={moment(this.state.rowsEditing[index].expiry)}
            onChange={(date, dateString) => this.handleExpiryChange(dateString, index)}
          />)
        }
        else {
          return moment(text).format('MMMM Do YYYY')
        }
      },
    }, {
      title: 'Actions',
      render: (text, row, index) => {
        if (row.editing) {
          return (
            <div>
              <a onClick={() => this.editDone(index)}>Save</a>
              <span className="ant-divider" />
              <a onClick={() => this.editCancel(index)}>Cancel</a>
            </div>
          )
        }
        return (
          <div>
            <a onClick={() => this.edit(index, row)}>Edit</a>
            <span className="ant-divider" />
            <a onClick={() => this.delete(row._id, index)}>Delete</a>
          </div>
        )
      },
    }]
    return (
      <div>
        <h1>
          Products
        </h1>
        <Table bordered columns={columns} dataSource={this.props.list} />
        <div style={{ display: 'flex' }}>
          <AddProduct />
          <Button style={{ marginLeft: '10px' }} onClick={this.logout}>Logout</Button>
        </div>
      </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable)
