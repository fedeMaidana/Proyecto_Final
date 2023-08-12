import axios from 'axios'
import {
    GET_PRODUCTS,
    POST_PRODUCTS,
    DELETE_PRODUCTS,
    GET_PRODUCT_DETAIL,
    SEARCH_PRODUCT,
    SET_COLOR,
    SET_SIZE,
    SET_MODAL,
    SET_DESIGN_TITLE,
    SET_DESIGN_DESCRIPTION,
    APPLY_FILTERS,
    APPLY_SORTING,
    ALL_CATEGORIES,
    ADD_IMAGE,
    CLEAR_IMAGES,
    GET_USERS
} from "./action-types"

export const getProducts = () => {
    return async ( dispatch ) => {
        const { data } = await axios.get( '/products' )
        return dispatch( { type: GET_PRODUCTS, payload: data } )
    }
}

export const postProducts = ( dataProduct ) => {
    return async ( dispatch ) => {
        const { data } = await axios.post( '/products', dataProduct )
        return dispatch( { type: POST_PRODUCTS, payload: data } )
    }
}

export const deleteProducts = ( payload ) => {
    return async ( dispatch ) => {
        try{
            let info = await axios.delete( `/products?name=${ payload }`)
            return dispatch( { type: DELETE_PRODUCTS, payload: info.data } )
        } catch ( error ){
            console.log( 'Error deleting a Product', error )
        }
    }
}

export const getProductDetail = ( id ) => {
    return async ( dispatch ) => {
        let info = await axios.get( `/products/${ id }` )
        return dispatch( { type: GET_PRODUCT_DETAIL, payload: info.data } )
    }
}

export const searchProduct = ( payload ) => {
    return async ( dispatch ) => {
        try{
            let info = await axios.get( `/products/?name=${ payload }` )
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

export const setDescription = ( string ) => {
    return{
        type: SET_DESIGN_DESCRIPTION,
        payload: string
    }
}

export const applyFilters = ( filters ) => {
    return async ( dispatch ) => {
        try {
            const response = await axios.get( '/filter', {
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
            const response = await axios.get( '/filter', {
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
            const response = await axios.get( '/categories' )

            dispatch( { type: ALL_CATEGORIES, payload: response.data } )
        } catch( error ){
            console.error( 'Error fetching sorted products:', error )
        }
    }
}

export const addImage = (imageDataUrl) => ({
    type: ADD_IMAGE,
    payload: imageDataUrl,
})

export const clearImages = () => ({
    type: CLEAR_IMAGES,
})

export const getUsers = () => {
    return async ( dispatch ) => {
        const { data } = await axios.get( '/users' )
        return dispatch( { type: GET_USERS, payload: data } )
    }
}

