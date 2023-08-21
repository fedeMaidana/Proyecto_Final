const cartController = require( '../controllers/ShoppingCart' )

const cartHandler = {
  getShoppingCart: async ( _req, res ) => {
    try{
      const shoppingCart = await cartController.getShoppingCart()
      res.json( shoppingCart )
    }catch( error ){
      res.status( 500 ).json( { error: 'Error al obtener el carrito de compras' } )
    }
  },

  addToCart: async ( req, res ) => {
    try{
        const {   cartId, product} = req.body
        const cart = await cartController.addToCartControllers( {   cartId, product})

        res.status( 201 ).json( cart)
    }catch( error ){
      res.status( 500 ).json( { error: 'Error al agregar el producto al carrito' } )
    }
  },

  createCart: async ( req, res ) => {
    try{
        const { product, userId } = req.body
        console.log('este es id:',userId)
        const cart = await cartController.createCartControllers({ product, userId })

        res.status( 201 ).json( cart)
    }catch( error ){
      res.status( 500 ).json( { error: 'Error al agregar el producto al carrito' } )
    }
  },

  removeFromCart: async ( req, res ) => {
    try{
      const id = req.params
      const removedProduct = await cartController.removeFromCart( id )

      res.json( removedProduct )
    }catch( error ){
      res.status( 500 ).json( { error: 'Error al eliminar el producto del carrito' } )
    }
  }
}

module.exports = cartHandler

