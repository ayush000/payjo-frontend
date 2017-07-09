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
} from '../action'
import initalState from '../initialState'

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

export default combineReducers({
  auth,
})
