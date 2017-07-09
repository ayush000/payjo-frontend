import { createAction, createActions } from 'redux-actions'

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const REGISTER = 'REGISTER'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const SET_TOKEN = 'SET_TOKEN'

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
