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
    console.log(action.payload)
    const response = yield call(Api.register, action.payload)
    const { data } = response
    window.localStorage.setItem(tokenKey, data.token)
    yield put(registerSuccess(data))
  } catch (err) {
    yield put(registerFailure(new Error(err.response.data)))
  }
}

export default function* root() {
  yield takeEvery(LOGIN, login)
  yield takeEvery(REGISTER, register)
}
