import { applyMiddleware, compose } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'

/* const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose */

const store = configureStore({
    reducer: reducer,
    middleware: [ thunkMiddleware ],
    /* enhancers: [ composeEnhancer ] */
})

export default store
