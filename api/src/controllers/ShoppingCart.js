const { Shopping_cart, Product  } = require('../db');

const cartController = {
  getShoppingCart: async () => {
    try {
      return await Shopping_cart.findAll();
    } catch (error) {
      throw new Error('Error al obtener el carrito de compras');
    }
  },
  
  addToCart: async (id, cartId, productId, quantity) => {
    try {
      if (!id) {
        throw new Error('Usuario no autenticado. Debes iniciar sesión.');
      }
  
      const cart = await Shopping_cart.findByPk(cartId);
  
      if (!cart) {
        throw new Error('Carrito de compras no encontrado');
      }
  
      const product = await Product.findByPk(productId);
  
      if (!product) {
        throw new Error('Producto no encontrado');
      }
  
      const isStockAvailable = await cart.checkProductStock(productId, quantity);
  
      if (!isStockAvailable) {
        throw new Error('Stock insuficiente');
      }
  
      // Agregar el producto al carrito con la cantidad especificada
      await cart.addProduct(product, { through: { quantity: quantity } });
  
      return { message: 'Producto agregado al carrito con éxito' };
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
      throw new Error('Error al agregar el producto al carrito');
    }
  },
  

  removeFromCart: async (id) => {
    try {
      const product = await Shopping_cart.findByPk(id);
      
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