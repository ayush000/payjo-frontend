import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import createSagaMiddleware from 'redux-saga'

// redux-thunk is a part of the redux middleware
// which facilitates all the impure work in react-redux system
const sagaMiddleware = createSagaMiddleware()
const middleware = process.env.NODE_ENV !== 'production' ?
  [reduxImmutableStateInvariant(), sagaMiddleware] : [sagaMiddleware]

const composeEnhancers = (process.env.NODE_ENV === 'production' ?
  null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export default (initialState) => createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
)
export { sagaMiddleware }

