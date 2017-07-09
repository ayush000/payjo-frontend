import { createAction, createActions } from 'redux-actions'

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const REGISTER = 'REGISTER'

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

export const SET_TOKEN = 'SET_TOKEN'

export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS'
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE'

export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE'

export const {
  login,
  loginSuccess,
  loginFailure,
} = createActions(LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE)

export const {
  register,
  registerSuccess,
  registerFailure,
} = createActions(REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE)

export const setToken = createAction(SET_TOKEN)

export const {
  createProduct,
  createProductSuccess,
  createProductFailure,
} = createActions(CREATE_PRODUCT, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_SUCCESS)

export const {
  getProducts,
  getProductsSuccess,
  getProductsFailure,
} = createActions(GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_SUCCESS)
