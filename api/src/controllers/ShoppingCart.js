const { Shopping_cart, Product  } = require( '../db' )

const cartController = {

  getShoppingCart: async () => {
    try{
      return await Shopping_cart.findAll()
    }catch( error ){
      throw new Error( 'Error al obtener el carrito de compras' )
    }
  },

  addToCartControllers: async ( {cartId, product}) => {
    console.log(product)
    console.log(cartId)
    try {
      const cart = await Shopping_cart.findByPk(cartId);
      if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado.' });
      }
  
      // Actualiza los campos correspondientes en el carrito

      console.log('Cart before adding product:', cart);

      cart.name.push(product.name);
      await cart.save();
  
      console.log('Cart after adding product:', cart);
      await cart.addProduct(product.id);
  
      return cart;
    } catch (error) {
      console.error(error)
      throw new Error('Error al agregar el producto al carrito');
    }
  },

  createCartControllers: async ( { product, userId }) => {
    console.log('user',product)
    try {
      const cart = await Shopping_cart.create({
        name: [product.name],
        estado_pedido: 'En Proceso',
        userId:userId
      });

      await cart.addProduct(product.id);
  
      return cart;
    } catch (error) {
      console.error(error)
      throw new Error('Error al agregar el producto al carrito');
    }
  },



  

  removeFromCart: async ( id ) => {
    try{
      const product = await Shopping_cart.findByPk( id )

      if( !product ) throw new Error( 'Producto no encontrado en el carrito' )

      await product.destroy()

      return product

    }catch( error ){
      throw new Error( 'Error al eliminar el producto del carrito' )
    }
  }
}

module.exports = cartController