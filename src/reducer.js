import { combineReducers } from 'redux'
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  EDIT_ROW,
  EDIT_ROW_CANCEL,
  SAVE_ROW,
  SAVE_ROW_SUCCESS,
  SAVE_ROW_FAILURE,
  DELETE_ROW,
  DELETE_ROW_SUCCESS,
  DELETE_ROW_FAILURE,
} from './action'
import initalState from './initialState'

const auth = (state = initalState.auth, action) => {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      return { ...state, inProgress: true }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, inProgress: false, token: action.payload.token }
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return { ...state, inProgress: false, error: action.payload.message }
    default:
      return state
  }
}

const product = (state = initalState.product, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
    case CREATE_PRODUCT:
      return { ...state, inProgress: true }
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        inProgress: false,
        list: action.payload.map(row => ({ ...row, editing: false, key: row._id })),
      }
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        inProgress: false,
        list: [...state.list, { ...action.payload, editing: false, key: action.payload._id }],
      }
    case CREATE_PRODUCT_FAILURE:
    case GET_PRODUCTS_FAILURE:
      return { ...state, inProgress: false, error: action.payload.message }
    case EDIT_ROW: {
      const index = action.payload
      const rowEditing = state.list[index]
      const { list } = state
      return {
        ...state,
        list: [
          ...list.slice(0, index),
          { ...rowEditing, editing: true },
          ...list.slice(index + 1),
        ],
      }
    }
    case EDIT_ROW_CANCEL: {
      const index = action.payload
      const rowEditing = state.list[index]
      const { list } = state
      return {
        ...state,
        list: [
          ...list.slice(0, index),
          { ...rowEditing, editing: false },
          ...list.slice(index + 1),
        ],
      }
    }
    case SAVE_ROW: {
      const { index } = action.payload
      const rowEditing = state.list[index]
      const { list } = state
      return {
        ...state,
        list: [
          ...list.slice(0, index),
          { ...rowEditing, editing: false, inProgress: true },
          ...list.slice(index + 1),
        ],
      }
    }
    case SAVE_ROW_SUCCESS: {
      const { index, data } = action.payload
      const { list } = state
      return {
        ...state,
        list: [
          ...list.slice(0, index),
          { ...data, inProgress: false, key: data._id },
          ...list.slice(index + 1),
        ],
      }
    }
    case DELETE_ROW_FAILURE:
    case SAVE_ROW_FAILURE: {
      const { index, err } = action.payload
      const { list } = state
      const rowEditing = state.list[index]
      return {
        ...state,
        list: [
          ...list.slice(0, index),
          { ...rowEditing, inProgress: false },
          ...list.slice(index + 1),
        ],
        errors: [...state.errors, err],
      }
    }
    case DELETE_ROW: {
      const { index } = action.payload
      const rowDeleting = state.list[index]
      const { list } = state
      return {
        ...state,
        list: [
          ...list.slice(0, index),
          { ...rowDeleting, inProgress: true },
          ...list.slice(index + 1),
        ],
      }
    }
    case DELETE_ROW_SUCCESS: {
      const index = action.payload
      const { list } = state
      return {
        ...state,
        list: [
          ...list.slice(0, index),
          ...list.slice(index + 1),
        ],
      }
    }
    default:
      return state
  }
}

const redirect = (state = initalState.redirect, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_FAILURE:
    case GET_PRODUCTS_FAILURE:
    case SAVE_ROW_FAILURE:
    case DELETE_ROW_FAILURE: {
      if (action.payload.message === 'Authentication Error' ||
        (action.payload.err && action.payload.err.message === 'Authentication Error')) {
        return true
      }
      return state
    }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return false
    default:
      return state
  }
}

export default combineReducers({
  auth,
  product,
  redirect,
})
