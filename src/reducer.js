import { combineReducers } from 'redux'
// export default combineReducers()
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_TOKEN,
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
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
    case SET_TOKEN: {
      return { ...state, token: action.payload }
    }
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
      return { ...state, inProgress: false, list: action.payload }
    case CREATE_PRODUCT_SUCCESS:
      return { ...state, inProgress: false, list: [...state.list, action.payload] }
    case CREATE_PRODUCT_FAILURE:
    case GET_PRODUCTS_FAILURE:
      return { ...state, inProgress: false, error: action.payload.message }
    default:
      return state
  }
}

export default combineReducers({
  auth,
  product,
})
