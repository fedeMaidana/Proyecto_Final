const { Shopping_cart  } = require('../db');

const cartController = {
  getShoppingCart: async () => {
    try {
      return await Shopping_cart.findAll();
    } catch (error) {
      throw new Error('Error al obtener el carrito de compras');
    }
  },
  
  addToCart: async (userId, cartId, productId, quantity) => {
    try {
        // para verificar si el usuario se encuentra logeado
        if (!userId) {
          throw new Error('Usuario no autenticado. Debes iniciar sesión.');
        }

        //verificar carrito de compras
        const cart = await Shopping_cart.findByPk(cartId);

        if (!cart) {
          throw new Error('Carrito de compras no encontrado');
        }
          // Validar la disponibilidad de stock si es necesario
          const isStockAvailable = await cart.checkProductStock(productId, quantity);

          if (!isStockAvailable) {
            throw new Error('Stock insuficiente');
          }
    
          // Agregar el producto al carrito
    const addedProduct = await Shopping_cart.createProduct({
        price_data: [], // Ajusta los detalles del precio según tu lógica
        adjustable_quantity: [], // Ajusta según tu lógica
        quantity: [], // Ajusta según tu lógica
      });
  
      return addedProduct;
    } catch (error) {
      throw new Error('Error al agregar el producto al carrito');
    }
  },

  removeFromCart: async (productId) => {
    try {
      const product = await Shopping_cart.findByPk(productId);
      
      if (!product) {
        throw new Error('Producto no encontrado en el carrito');
      }

      await product.destroy();
      return product;
    } catch (error) {
      throw new Error('Error al eliminar el producto del carrito');
    }
  },
};

module.exports = cartController;
