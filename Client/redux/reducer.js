import {GET_PRODUCTS, DELETE_PRODUCTS, GET_PRODUCT_DETAIL, SEARCH_PRODUCT} from "./action-types";

const initialState = {
    products: [],
    allProducts: [],
    productDetail: {},

}
const reducer = (state = initialState, {type,payload}) => {
    switch(type){

        case GET_PRODUCTS:
            return { ...state, products: payload, allProducts: payload };

        case GET_PRODUCT_DETAIL:
            return { ...state, productDetail: payload };

        case DELETE_PRODUCTS:
            return { ...state};

        case SEARCH_PRODUCT:
            let ProductosBuscados = payload
            let productosfiltrados = state.products
            if(state.products!==state.allProducts){
                 ProductosBuscados = productosfiltrados.filter((product) => payload.some((count) => count.id === product.id))
            }
            return {...state, countries:ProductosBuscados};       

        default:
            return {...state};
    }
};

export default reducer;