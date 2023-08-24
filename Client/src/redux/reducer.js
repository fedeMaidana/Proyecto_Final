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
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  INCREMENT_PRODUCT,
  DECREMENT_PRODUCT,
  LOAD_CART,
  SEARCH_PRODUCT_FAILURE,
  CLEAR_SEARCH_PRODUCTS,
  GET_CART,
  GET_USERS,
  GET_USERS_BY_NAME,
  BAN_USER,
  CHANGE_ROLE,
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
  BUY_SUCCESS,
  SET_CART_DATA,
  APPLY_SORTING_TO_USERS
} from "./action-types";

const initialState = {
  products: [],
  allProducts: [],
  productDetail: {},
  clothingColor: "",
  clothingSize: "",
  openModal: false,
  designTitle: "Diseño sin titulo",
  designDescription: "",
  appliedFilters: {
    sorting: ''
  }, // Sorting option (priceAsc, priceDesc, nameAsc, na
  sorting: [],
  categories: [],
  capturedImages: [],
  cartProducts: [], // Aquí se almacenan los productos en el carrito
  allCartProducts: [],
  cartTotal: 0, // Aquí se almacenan el total del carrito
  cartCount: 0, // Aquí se almacenan la cantidad total de productos en el carrito
  searchProducts: [],
  users: [],
  allUsers: [],
  favorites: [],
  cartId: localStorage.getItem('cartId') || null,
  buyCart: [],
  message: '',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return { ...state, products: payload, allProducts: payload };

    case POST_PRODUCTS:
      return { ...state, products: payload, allProducts: payload };

    case GET_PRODUCT_DETAIL:
      return { ...state, productDetail: payload };

    case DELETE_PRODUCTS:
      return { ...state, message: payload };

    case SET_COLOR:
      return { ...state, clothingColor: payload };

    case SET_SIZE:
      return { ...state, clothingSize: payload };

    case SET_MODAL:
      return { ...state, openModal: payload };

    case SET_DESIGN_TITLE:
      return { ...state, designTitle: payload };

    case SET_DESIGN_DESCRIPTION:
      return { ...state, designDescription: payload };

    case APPLY_FILTERS:
      return { ...state, allUsers: payload, };

    case APPLY_SORTING:
      return { ...state, appliedFilters: payload };

    case ALL_CATEGORIES:
      return { ...state, categories: payload };

    case ADD_IMAGE:
      return { ...state, capturedImages: [...state.capturedImages, payload] };

    case CLEAR_IMAGES:
      return { ...state, capturedImages: [] }

    case SEARCH_PRODUCT:
      if (typeof payload === "object" && payload.message) {
        // Si 'payload' es un objeto con un mensaje de error, actualiza el estado 'error'
        return { ...state, searchProducts: [], error: payload.message }
      } else {
        return { ...state, searchProducts: payload, error: null }
      }

    case SEARCH_PRODUCT_FAILURE:
      return { ...state, error: { message: payload, statusCode: null } }

    case CLEAR_SEARCH_PRODUCTS:
      return { ...state, searchProducts: [] }

    case GET_USERS:
      return { ...state, users: payload, allUsers: payload }

    case GET_CART:
      return { ...state, allCartProducts: payload }


    case GET_USERS_BY_NAME:
      return { ...state, users: payload, allUsers: payload }


    case BAN_USER:
      const updatedUsers = state.users.map(user => {
        if (user.id === payload.id) {
          return {
            ...user,
          };
        }
        return user;
      });

      return {
        ...state,
        users: updatedUsers,
      };


    case CHANGE_ROLE:
      const adminUsers = state.users.map(user => {
        if (user.id === payload.id) {
          return {
            ...user,
          };
        }
        return user;
      });

      return {
        ...state,
        users: adminUsers,
      };


    case SET_CART_DATA: return { ...state, cartProducts: payload, }

    case ADD_TO_CART:
      const newProduct = payload
      const existingProductIndex = state.cartProducts.findIndex(product => product.id === newProduct.id)

      if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, actualiza su cantidad
        const updatedProducts = [...state.cartProducts]
        updatedProducts[existingProductIndex].quantity += 1

        return {
          ...state,
          cartProducts: updatedProducts,
          cartTotal: parseFloat(state.cartTotal) + parseFloat(newProduct.price),
          cartCount: state.cartCount + 1
        }
      } else {
        // Si el producto no está en el carrito, agrégalo
        newProduct.quantity = 1

        return {
          ...state,
          cartProducts: [...state.cartProducts, newProduct],
          cartTotal: parseFloat(state.cartTotal) + parseFloat(newProduct.price),
          cartCount: state.cartCount + 1
        }
      }

    case REMOVE_FROM_CART:
      const productIdToRemove = payload
      const productToRemove = state.cartProducts.find(product => product.productId === productIdToRemove)

      if (productToRemove) {
        const updatedProducts = state.cartProducts.filter(product => product.productId !== productIdToRemove)

        return {
          ...state,
          cartProducts: updatedProducts,
          cartTotal: state.cartTotal - productToRemove.price * productToRemove.quantity,
          cartCount: state.cartCount - productToRemove.quantity
        }
      } else {
        return state
      }

    case CLEAR_CART:
      return { ...state, cartProducts: [], cartTotal: 0, cartCount: 0 }

    case INCREMENT_PRODUCT:
      const incrementedProducts = state.cartProducts.map(product =>
        product.id === payload.product.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )

      return {
        ...state,
        cartProducts: incrementedProducts,
        cartTotal: parseFloat(state.cartTotal) + parseFloat(payload.product.price),
        cartCount: state.cartCount + 1
      }

    case DECREMENT_PRODUCT:
      const decrementedProducts = state.cartProducts.map(product =>
        product.id === payload.product.id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )

      return {
        ...state,
        cartProducts: decrementedProducts,
        cartTotal: parseFloat(state.cartTotal) - parseFloat(payload.product.price),
        cartCount: state.cartCount - 1,
      }

    case LOAD_CART:
      return {
        ...state,
        cartProducts: payload.cartProducts,
        cartTotal: payload.cartTotal,
        cartCount: payload.cartCount,
      }

    case GET_FAVORITES:
      return { ...state, favorites: payload }

    case ADD_FAVORITE:
      return { ...state, favorites: [...state.favorites, payload] }

    case DELETE_FAVORITE:
      return { ...state, favorites: state.favorites.filter(favorite => favorite.id !== payload) }

    case ADD_COMMENT:
      return { ...state, comments: [...state.comments, payload] }

    case GET_COMMENTS:
      return { ...state, comments: payload }

    case UPDATE_COMMENT:
      return { ...state, comments: state.comments.map(comment => comment.id === payload.id ? payload : comment) }

    case DELETE_COMMENT:
      return { ...state, comments: state.comments.filter(comment => comment.id !== payload) }

    //cartId
    case UPDATE_CART_ID:
      localStorage.setItem('cartId', payload);
      return {
        ...state,
        cartId: payload,
      };
    case BUY_CART_ID: return {
      ...state, buyCart: payload
    }

    case CANCEL_CART_ID: return {
      ...state, buyCart: payload
    }
    case BUY_SUCCESS: return {
      ...state, buyCart: payload
    }
    case APPLY_SORTING_TO_USERS:
      const sortedUsers = [...state.allUsers];
      sortedUsers.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      return { ...state, allUsers: sortedUsers };


    default:
      return { ...state }
  }
}

export default reducer
