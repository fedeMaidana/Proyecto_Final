import {GET_PRODUCTS, DELETE_PRODUCTS, GET_PRODUCT_DETAIL, SEARCH_PRODUCT} from "./action-types";
import axios from 'axios';


export const getProducts = () => {
    return async (dispatch) => {
        const {data} = await axios.get('http://localhost:3001/products')
        return dispatch({type: GET_PRODUCTS, payload: data})
    }
}

export const deleteProducts = (payload) => {
    return async (dispatch) => {
        try {
            let info = await axios.delete(`http://localhost:3001/products?name=${payload}`);
            return dispatch({ type: DELETE_PRODUCTS, payload: info.data })
        } catch (error) {
            console.log('Error deleting a Product', error);
        }
    }
}

export const getProductDetail = (id) => {
    return async (dispatch) => {
        let info = await axios.get(`http://localhost:3001/products/${id}`)
        return dispatch({type: GET_PRODUCT_DETAIL, payload: info.data})
    }
}

export const searchProduct = (payload) => {
    return async (dispatch) => {
        try {
            let info = await axios.get(`http://localhost:3001/products/?name=${payload}`);
            return dispatch({ type: SEARCH_PRODUCT, payload: info.data });
        } catch (error) {
            console.log('Error searching for a product', error);
        }
    }
}