import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Table } from 'antd'
import moment from 'moment'

import { getProducts } from '../../action'
import AddProduct from './AddProduct'

const mapStateToProps = state => ({ ...state.product })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getProducts }, dispatch),
})
class ProductTable extends Component {
  state = {
    modalVisible: false,
  }

  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
  }

  componentDidMount() {
    this.props.actions.getProducts()
  }

  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Code',
      dataIndex: 'code',
    }, {
      title: 'Quantity',
      dataIndex: 'quantity',
    }, {
      title: 'Expiry',
      dataIndex: 'expiry',
      render: text => moment(text).format('MMMM Do YYYY'),
    }]
    return (
      <div>
        <h1>
          Products
        </h1>
        <Table bordered columns={columns} dataSource={this.props.list}/>
        <AddProduct />
      </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable)
