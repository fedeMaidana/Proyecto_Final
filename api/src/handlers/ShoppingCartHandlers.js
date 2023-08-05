const cartController = require('../controllers/ShoppingCart');

const cartHandler = {
  getShoppingCart: async (req, res) => {
    try {
      const shoppingCart = await cartController.getShoppingCart();
      res.json(shoppingCart);
    } catch (error) {
      console.error('Error al obtener el carrito de compras:', error);
      res.status(500).json({ error: 'Error al obtener el carrito de compras' });
    }
  },
  
  addToCart: async (req, res) => {
    try {
        const {id} = req.user; // Obtener el ID del usuario autenticado
        const cartId = req.params.cartId;
        const { productId, quantity } = req.body;
      const addedProduct = await cartController.addToCart(id, cartId, productId, quantity );
      res.status(201).json(addedProduct);
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
      res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const id = req.params;
      const removedProduct = await cartController.removeFromCart(id);
      res.json(removedProduct);
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
      res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
    }
  },
};

module.exports = cartHandler;

