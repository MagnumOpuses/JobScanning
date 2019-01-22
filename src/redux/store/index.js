import { applyMiddleware, createStore, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
// import googleAnalyticsMiddleware from '../middlewares/googleAnalyticsMiddleware'

const middleware = [thunk]

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(applyMiddleware(...middleware))

const store = createStore(rootReducer, enhancer)

export default store
