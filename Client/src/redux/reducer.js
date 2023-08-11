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
    APPLY_SORTING,
    APPLY_FILTERS,
    ALL_CATEGORIES,
    CLEAR_IMAGES,
    ADD_IMAGE,
    SEARCH_PRODUCT_FAILURE,
    CLEAR_SEARCH_PRODUCTS

} from "./action-types"


const initialState = {
    products: [],
    allProducts: [],
    productDetail: {},
    clothingColor: '',
    clothingSize: '',
    openModal: false,
    designTitle: 'Diseño sin titulo',
    designDescription: '',
    filters:[],
    sorting: [],
    categories:[],
    capturedImages: [],
    searchProducts: []
}

const reducer = ( state = initialState, { type, payload } ) => {
    switch( type ){
        case GET_PRODUCTS:
            return { ...state, products: payload, allProducts: payload }

        case POST_PRODUCTS:
            return { ...state, products: payload, allProducts: payload }

        case GET_PRODUCT_DETAIL:
            return { ...state, productDetail: payload }

        case DELETE_PRODUCTS:
            return { ...state }

        case SET_COLOR:
            return{ ...state, clothingColor: payload }

        case SET_SIZE:
            return{ ...state, clothingSize: payload }

        case SET_MODAL:
            return{ ...state, openModal: payload }

        case SET_DESIGN_TITLE:
            return{ ...state, designTitle: payload }

        case SET_DESIGN_DESCRIPTION:
            return{ ...state, designDescription: payload }

        case APPLY_FILTERS:
                return { ...state, allProducts: payload, filters: payload }

        case APPLY_SORTING:
                return { ...state, products: payload, sorting: payload }

        case ALL_CATEGORIES: return{ ...state, categories: payload }

        case ADD_IMAGE:
            return { ...state, capturedImages: [...state.capturedImages, payload] };

        case CLEAR_IMAGES:
            return { ...state, capturedImages: [] };
        
            case SEARCH_PRODUCT: 
      if (typeof payload === "object" && payload.message) {
        // Si 'payload' es un objeto con un mensaje de error, actualiza el estado 'error'
        return {
          ...state,
          searchProducts: [],
          error: payload.message,
        };
      } else {
        
        return {
          ...state,
          searchProducts: payload,
          error: null,
        };
      }
        
    
    case SEARCH_PRODUCT_FAILURE: return{
        ...state,
        error: { message: payload, statusCode: null },
        
    }
    case CLEAR_SEARCH_PRODUCTS: return{
        ...state,
        searchProducts: [],
        
    }
    
            default:
            return { ...state }
    }
}

export default reducer