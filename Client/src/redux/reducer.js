import {
    GET_PRODUCTS,
    DELETE_PRODUCTS,
    GET_PRODUCT_DETAIL,
    SEARCH_PRODUCT,
    SET_COLOR,
    SET_SIZE,
    SET_MODAL,
    SET_DESIGN_TITLE
} from "./action-types"

const initialState = {
    products: [],
    allProducts: [],
    productDetail: {},
    clothingColor: '',
    clothingSize: '',
    openModal: false,
    designTitle: 'Diseño sin titulo'
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

        case SET_MODAL:
            return{ ...state, openModal: payload }

        case SET_DESIGN_TITLE:
            return{ ...state, designTitle: payload }

        default:
            return { ...state }
    }
}

export default reducer