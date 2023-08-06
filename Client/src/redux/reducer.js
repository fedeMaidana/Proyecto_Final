import {
    GET_PRODUCTS,
    DELETE_PRODUCTS,
    GET_PRODUCT_DETAIL,
    SEARCH_PRODUCT,
    SET_COLOR,
    SET_SIZE,
    APPLY_SORTING,
    APPLY_FILTERS,
    ALL_CATEGORIES

} from "./action-types"


const initialState = {
    products: [],
    allProducts: [],
    productDetail: {},
    clothingColor: '',
    clothingSize: '',
    filters:[],
    sorting: [],
    categories:[]

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

        case APPLY_FILTERS:
                return { ...state, 
                    allProducts: payload,
                    filters: payload };
        case APPLY_SORTING:
                return { ...state, 
                    products: payload,
                    sorting: payload };

        case ALL_CATEGORIES: return{
            ...state,
            categories: payload
        }

        default:
            return { ...state }
    }
}

export default reducer