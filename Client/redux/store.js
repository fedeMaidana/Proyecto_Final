/* import {applyMiddleware, compose } from 'redux'; */
import {configureStore} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

/* const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  */// esta línea sirve para conectar nuestra App con la extensión REDUX DEVTOOLS DEL NAVEGADOR

/* const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware)) // esta línea sirva para que podamos hacer peticiones a una Api/servidor
); */
const store = configureStore({
    reducer: reducer,
    middleware: [thunkMiddleware],
    /* enhancers: [composeEnhancer] */
  });

export default store;
