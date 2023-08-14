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
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    INCREMENT_PRODUCT,
    DECREMENT_PRODUCT,
    LOAD_CART,
    SEARCH_PRODUCT_FAILURE,
    CLEAR_SEARCH_PRODUCTS,
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


export const getSearch = (name) => {
    const url = `/products/search/?name=${name}`;
    return async (dispatch) => {
      try {
        const response = await axios.get(url);
        const products = response.data;
        console.log(products); // Verifica si los datos se reciben correctamente
        dispatch({
          type: SEARCH_PRODUCT,
          payload: products,
        });
      } catch (error) {
        dispatch({
          type: SEARCH_PRODUCT_FAILURE,
          payload: error.response.data.message,
          
        });
      }
    };
  };
  
  export const clearSearch = ()=>{
      return{
          type: CLEAR_SEARCH_PRODUCTS
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
export const applyFilters = (filters) => {
    return async (dispatch) => {
      try {
        const response = await axios.get('/filter', {
          params: {
            category: filters.category,
            min_price: filters.minPrice,
            max_price: filters.maxPrice,
            
          },
        });
  
        dispatch({
          type: APPLY_FILTERS,
          payload: response.data,
        filters : filters
        });
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      }
    };
  };


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
                payload: response.data,
                sorting: sorting
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

});


/* Carrito de compras */

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,
  });
  
  export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
  });
  export const clearCart = () => {
    return {
      type: CLEAR_CART,
    };
  };
  export const incrementProduct = (product) => {
    return {
      type: INCREMENT_PRODUCT,
      payload: {product},
    };
  };
  
  export const decrementProduct = (product) => {
    return {
      type: DECREMENT_PRODUCT,
      payload: {product},
    };
  };

export const loadCart = (cartData) => {
    return {
      type: LOAD_CART,
      payload: cartData,
    };
  };

export const getUsers = () => {
    return async ( dispatch ) => {
        const { data } = await axios.get( '/users' )
        return dispatch( { type: GET_USERS, payload: data } )
    }
}


