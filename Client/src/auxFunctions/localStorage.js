// localStorage.js
const CART_STORAGE_KEY = 'cart';

// Cargar el carrito desde Local Storage
export const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem(CART_STORAGE_KEY);
    //console.log(`serializedCart: ${serializedCart}`); //  {"cartProducts":[],"cartTotal":0,"cartCount":0}
    if (serializedCart === null) {
      return undefined;
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error('Error loading cart from Local Storage:', err);
    return undefined;
  }
};

// Guardar el carrito en Local Storage
export const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem(CART_STORAGE_KEY, serializedCart);
  } catch (err) {
    console.error('Error saving cart to Local Storage:', err);
  }
};
