import {
    GET_PRODUCTS,
    DELETE_PRODUCTS,
    GET_PRODUCT_DETAIL,
    SEARCH_PRODUCT,
    SET_COLOR,
    SET_SIZE
} from "./action-types"

const initialState = {
    products: [],
    allProducts: [],
    productDetail: {},
    clothingColor: '',
    clothingSize: ''
}

const reducer = ( state = initialState, { type, payload } ) => {
    switch( type ){
        case GET_PRODUCTS:
            return { ...state, products: payload, allProducts: payload }

        case GET_PRODUCT_DETAIL:
            return { ...state, productDetail: payload }

        case DELETE_PRODUCTS:
            return { ...state }

        case SEARCH_PRODUCT:
            let ProductosBuscados = payload
            let productosfiltrados = state.products

            if( state.products !== state.allProducts ){
                ProductosBuscados = productosfiltrados.filter( product => payload.some( count => count.id === product.id ) )
            }

            return {...state, countries:ProductosBuscados }

        case SET_COLOR:
            return{ ...state, clothingColor: payload }

        case SET_SIZE:
            return{ ...state, clothingSize: payload }

        default:
            return { ...state }
    }
}

export default reducer