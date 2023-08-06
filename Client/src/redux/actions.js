import axios from 'axios'
import {
    GET_PRODUCTS,
    DELETE_PRODUCTS,
    GET_PRODUCT_DETAIL,
    SEARCH_PRODUCT,
    SET_COLOR,
    SET_SIZE,
    SET_MODAL,
    SET_DESIGN_TITLE,
    APPLY_FILTERS,
    APPLY_SORTING,
    ALL_CATEGORIES
} from "./action-types"

export const getProducts = () => {
    return async ( dispatch ) => {
        const { data } = await axios.get( 'http://localhost:3001/products' )
        return dispatch( { type: GET_PRODUCTS, payload: data } )
    }
}

export const deleteProducts = ( payload ) => {
    return async ( dispatch ) => {
        try{
            let info = await axios.delete( `http://localhost:3001/products?name=${ payload }`)
            return dispatch( { type: DELETE_PRODUCTS, payload: info.data } )
        } catch ( error ){
            console.log( 'Error deleting a Product', error )
        }
    }
}

export const getProductDetail = ( id ) => {
    return async ( dispatch ) => {
        let info = await axios.get( `http://localhost:3001/products/${ id }` )
        return dispatch( { type: GET_PRODUCT_DETAIL, payload: info.data } )
    }
}

export const searchProduct = ( payload ) => {
    return async ( dispatch ) => {
        try{
            let info = await axios.get( `http://localhost:3001/products/?name=${ payload }` )
            return dispatch( { type: SEARCH_PRODUCT, payload: info.data } )
        }catch ( error ){
            console.log( 'Error searching for a product', error )
        }
    }
}

export const setColor = ( color ) => {
    return{
        type: SET_COLOR,
        payload: color
    }
}

export const setSize = ( size ) => {
    return{
        type: SET_SIZE,
        payload: size
    }
}

export const setModal = ( boolean ) => {
    return{
        type: SET_MODAL,
        payload: boolean
    }
}

export const setTitle = ( string ) => {
    return{
        type: SET_DESIGN_TITLE,
        payload: string
    }
}

export const applyFilters = ( filters ) => {
    return async ( dispatch ) => {
        try {
            const response = await axios.get( 'http://localhost:3001/filter', {
                params: {
                    category: filters.category,
                    min_price: filters.minPrice,
                    max_price: filters.maxPrice,
                }
            })

            dispatch({
                type: APPLY_FILTERS,
                payload: {
                    allProducts: response.data,
                    filters: filters
                }
            })
        } catch( error ) {
            console.error( 'Error fetching filtered products:', error )
        }
    }
}

export const applySorting = ( sorting ) => {
    return async ( dispatch ) => {
        try {
            const response = await axios.get( 'http://localhost:3001/filter', {
                params: {
                    sortOption: sorting,
                }
            })

            dispatch({
                type: APPLY_SORTING,
                payload: {
                    allProducts: response.data,
                    sorting: sorting
                }
            })
        } catch( error ) {
            console.error( 'Error fetching sorted products:', error )
        }
    }
}

export const getCategories = () => {
    return async ( dispatch ) => {
        try {
            const response = await axios.get( 'http://localhost:3001/categories' )

            dispatch( { type: ALL_CATEGORIES, payload: response.data } )
        } catch( error ){
            console.error( 'Error fetching sorted products:', error )
        }
    }
}
