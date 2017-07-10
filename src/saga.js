import { takeEvery, call, put } from 'redux-saga/effects'
import { tokenKey } from './constants'
import * as Api from './api'
import {
  LOGIN,
  loginSuccess,
  loginFailure,
  REGISTER,
  registerSuccess,
  registerFailure,
  CREATE_PRODUCT,
  createProductSuccess,
  createProductFailure,
  GET_PRODUCTS,
  getProductsSuccess,
  getProductsFailure,
  SAVE_ROW,
  saveRowSuccess,
  saveRowFailure,
  DELETE_ROW,
  deleteRowSuccess,
  deleteRowFailure,
} from './action'

export function* login(action) {
  try {
    const response = yield call(Api.login, action.payload)
    const { data } = response
    window.localStorage.setItem(tokenKey, data.token)
    yield put(loginSuccess(data))
  } catch (err) {
    yield put(loginFailure(new Error(err.response.data)))
  }
}

export function* register(action) {
  try {
    const response = yield call(Api.register, action.payload)
    const { data } = response
    window.localStorage.setItem(tokenKey, data.token)
    yield put(registerSuccess(data))
  } catch (err) {
    yield put(registerFailure(new Error(err.response.data)))
  }
}

export function* createProduct(action) {
  try {
    const response = yield call(Api.createProduct, action.payload)
    const { data } = response
    yield put(createProductSuccess(data))
  } catch (err) {
    yield put(createProductFailure(new Error(err.response.data)))
  }
}

export function* getProducts(action) {
  try {
    const response = yield call(Api.getProducts)
    const { data } = response
    yield put(getProductsSuccess(data))
  } catch (err) {
    yield put(getProductsFailure(new Error(err.response.data)))
  }
}

export function* saveRow(action) {
  const { productId, product, index } = action.payload
  try {
    const response = yield call(Api.updateProduct, productId, { product })
    const { data } = response
    yield put(saveRowSuccess({ index, data }))
  } catch (err) {
    yield put(saveRowFailure({ index, err: new Error(err.response.data) }))
  }
}

export function* deleteRow(action) {
  const { productId, index } = action.payload
  try {
    yield call(Api.deleteProduct, productId)
    yield put(deleteRowSuccess(index))
  } catch (err) {
    yield put(deleteRowFailure({ index, err: new Error(err.response.data) }))
  }
}

export default function* root() {
  yield takeEvery(LOGIN, login)
  yield takeEvery(REGISTER, register)
  yield takeEvery(CREATE_PRODUCT, createProduct)
  yield takeEvery(GET_PRODUCTS, getProducts)
  yield takeEvery(SAVE_ROW, saveRow)
  yield takeEvery(DELETE_ROW, deleteRow)
}
