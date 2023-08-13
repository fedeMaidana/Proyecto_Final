import {
    GET_PRODUCTS,
    DELETE_PRODUCTS,
    GET_PRODUCT_DETAIL,
    SEARCH_PRODUCT,
    SET_COLOR,
    SET_SIZE,
    SET_MODAL,
    SET_DESIGN_TITLE,
    APPLY_SORTING,
    APPLY_FILTERS,
    ALL_CATEGORIES,
    CLEAR_IMAGES,
    ADD_IMAGE,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    INCREMENT_PRODUCT,
    DECREMENT_PRODUCT,
    LOAD_CART

} from "./action-types"


const initialState = {
    products: [],
    allProducts: [],
    productDetail: {},
    clothingColor: '',
    clothingSize: '',
    openModal: false,
    designTitle: 'Diseño sin titulo',
    filters:[],
    sorting: [],
    categories:[],
    capturedImages: [],
    cartProducts: [], // Aquí se almacenan los productos en el carrito
    cartTotal: 0, // Aquí se almacenan el total del carrito
    cartCount: 0, // Aquí se almacenan la cantidad total de productos en el carrito

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

        case APPLY_FILTERS:
                return { ...state, allProducts: payload, filters: payload }

        case APPLY_SORTING:
                return { ...state, products: payload, sorting: payload }

        case ALL_CATEGORIES: return{ ...state, categories: payload }

        case ADD_IMAGE:
            return { ...state, capturedImages: [...state.capturedImages, payload] };

        case CLEAR_IMAGES:
            return { ...state, capturedImages: [] };
        default:
            return { ...state }
        
        case ADD_TO_CART:
            const newProduct = payload;
            const existingProductIndex = state.cartProducts.findIndex(
                (product) => product.id === newProduct.id
            );
        
            if (existingProductIndex !== -1) {
                // Si el producto ya está en el carrito, actualiza su cantidad
                const updatedProducts = [...state.cartProducts];
                updatedProducts[existingProductIndex].quantity += 1;
        
                return {
                ...state,
                cartProducts: updatedProducts,
                cartTotal: parseFloat(state.cartTotal) + parseFloat(newProduct.price),
                cartCount: state.cartCount + 1,
                };
            } else {
                // Si el producto no está en el carrito, agrégalo
                newProduct.quantity = 1;
        
                return {
                ...state,
                cartProducts: [...state.cartProducts, newProduct],
                cartTotal: parseFloat(state.cartTotal) + parseFloat(newProduct.price),
                cartCount: state.cartCount + 1,
                };
            }
        
            case REMOVE_FROM_CART:
            const productIdToRemove = payload;
            const productToRemove = state.cartProducts.find(
                (product) => product.id === productIdToRemove
            );
        
            if (productToRemove) {
                const updatedProducts = state.cartProducts.filter(
                (product) => product.id !== productIdToRemove
                );
        
                return {
                ...state,
                cartProducts: updatedProducts,
                cartTotal: state.cartTotal - productToRemove.price * productToRemove.quantity,
                cartCount: state.cartCount - productToRemove.quantity,
                };
            } else {
                return state;
            }

            case CLEAR_CART:
                return {
                  ...state,
                  cartProducts: [],
                  cartTotal: 0,
                  cartCount: 0,
                };
            case INCREMENT_PRODUCT:
                const incrementedProducts = state.cartProducts.map((product) =>
                    product.id === payload.product.id
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
                );
            
                return {
                    ...state,
                    cartProducts: incrementedProducts,
                    cartTotal: parseFloat(state.cartTotal) + parseFloat(payload.product.price),
                    cartCount: state.cartCount + 1,
                };
            case DECREMENT_PRODUCT:
                const decrementedProducts = state.cartProducts.map((product) =>
                    product.id === payload.product.id && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
                );
            
                return {
                    ...state,
                    cartProducts: decrementedProducts,
                    cartTotal: parseFloat(state.cartTotal) - parseFloat(payload.product.price),
                    cartCount: state.cartCount - 1,
                };
            case LOAD_CART:
                return {
                    ...state,
                    cartProducts: payload.cartProducts,
                    cartTotal: payload.cartTotal,
                    cartCount: payload.cartCount,
                };
    }
}

export default reducer