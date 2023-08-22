import axios from 'axios'
import {applySortingToProducts} from '../auxFunctions/sortingOrder'
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
    GET_USERS,
    GET_FAVORITES,
    ADD_FAVORITE,
    DELETE_FAVORITE,
    ADD_COMMENT, 
    GET_COMMENTS,
     UPDATE_COMMENT, 
     DELETE_COMMENT,
     UPDATE_CART_ID,
     BUY_CART_ID,
     CANCEL_CART_ID, 
     BUY_SUCCESS

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
        console.log(info.data )
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


// export const applySorting = ( sorting ) => {
//     return async ( dispatch ) => {
//          try {
//              const response = await axios.get( '/filter', {
//                 params: {
//                      sortOption: sorting,
//                  }
//              })

//             dispatch({
//                  type: APPLY_SORTING,
//                 payload: response.data,
//                 sorting: sorting
//             })
//          } catch( error ) {
//             console.error( 'Error fetching sorted products:', error )
//         }
//     }
//  }
// En tu acción Redux
export const applySorting = (sorting) => {
  return (dispatch, getState) => {
    try {
      const state = getState();
      const allUsers = state.allUsers;

      const updatedUsers = allUsers.map((user) => {
        const createdProducts = user.CreatedProducts;
        const sortedProducts = applySortingToProducts(createdProducts, sorting);

        return {
          ...user,
          CreatedProducts: sortedProducts,
        };
      });

      dispatch({
        type: APPLY_SORTING,
        payload: updatedUsers,
        sorting: sorting,
      });
    } catch (error) {
      console.error('Error applying sorting:', error);
    }
  };
};








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
        const response = await axios.get( '/users' )
        const data = response.data
        return dispatch( { type: GET_USERS, payload: data } )
    }
}


//Favorites
export const getFavorites = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/favorites/${userId}`);
      dispatch({ type: GET_FAVORITES, payload: response.data });
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };
};

export const addFavorite = (userId, productId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/favorites', { userId, productId });
      dispatch({ type: ADD_FAVORITE, payload: response.data.favorite });
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };
};

export const deleteFavorite = (favoriteId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/favorites/${favoriteId}`);
      dispatch({ type: DELETE_FAVORITE, payload: favoriteId });
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };
};


//Comments

export const addComment = (userId, productId, text) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/comments', { userId, productId, text });
      dispatch({ type: ADD_COMMENT, payload: response.data.comment });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
};

export const getComments = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/comments/');
      dispatch({ type: GET_COMMENTS, payload: response.data });
    } catch (error) {
      console.error('Error getting comments:', error);
    }
  };
};

export const getCommentsId = (productId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/comments/${productId}`);
      dispatch({ type: GET_COMMENTS, payload: response.data });
    } catch (error) {
      console.error('Error getting comments:', error);
    }
  };
};

export const updateComment = (commentId, newText) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/comments/${commentId}`, { newText });
      dispatch({ type: UPDATE_COMMENT, payload: response.data.comment });
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };
};

export const deleteComment = (commentId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/comments/${commentId}`);
      dispatch({ type: DELETE_COMMENT, payload: commentId });
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
};


//creacion carrito en el backend
export const createOrAddToCartbackend = (parsedUserId, cartId, newProduct) => {
  console.log(typeof cartId)
  return async (dispatch) => {
    try {
      let response;
      if (cartId === null || cartId === "null") {
        console.log(parsedUserId)
        // Si no hay cartId, crea un nuevo carrito y agrega el producto inicial
        response = await axios.post('/shopping_cart/create-cart', {
          userId: parsedUserId,
          product: newProduct,
        });
      } else {
        // Si hay un cartId, agrega el producto al carrito existente
        response = await axios.post('/shopping_cart/add-cart', {
          cartId: cartId,
          product: newProduct,
        });
      }

      const newCartId  = response.data.id;
      console.log(response.data)
      console.log('Nuevo cartId:', newCartId);
      // Actualiza el cartId en el estado global usando la acción
      localStorage.setItem('cartId', newCartId);
      dispatch(updateCartId(newCartId));

      // ... Otras acciones si es necesario
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  };
};

// Acción para actualizar el cartId en el estado global
export const updateCartId = (newCartId) => {
  return {
    type: UPDATE_CART_ID,
    payload: newCartId,
  };
};


export const buyToCartbackend = (cartId, newProduct, cartTotal) => {
  console.log(typeof cartId)
  return async (dispatch) => {
    try {
        const response = await axios.post('/shopping_cart/buy-cart', {
          cartId: cartId,
          product: newProduct,
          cartTotal: cartTotal
        });

        return dispatch( { type: BUY_CART_ID, payload: response.data } )

    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  };
};


export const cancelToCartbackend = (cartId, newProduct, cartTotal) => {
  console.log(typeof cartId)
  return async (dispatch) => {
    try {
        const response = await axios.post('/shopping_cart/cancel-cart', {
          cartId: cartId,
          product: newProduct,
          cartTotal: cartTotal
        });

        return dispatch( { type: CANCEL_CART_ID, payload: response.data } )

    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  };
};

export const buySuccessCart = (cartId, userId) => {
  console.log(typeof cartId)
  return async (dispatch) => {
    try {
        const response = await axios.post('/shopping_cart/buy-success', {
          cartId: cartId,
          userId:userId,
        });

        return dispatch( { type: BUY_SUCCESS, payload: response.data } )

    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  };
};