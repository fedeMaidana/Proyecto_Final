import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'

const store = configureStore({
    reducer: reducer,
    middleware: [ thunkMiddleware ]
})

export default store
