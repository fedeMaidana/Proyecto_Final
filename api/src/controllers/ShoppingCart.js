const { Shopping_cart, Product, User  } = require( '../db' )
const { sendEmail } = require('../Nodemailer/OrderBuy');

const cartController = {

  getShoppingCart: async () => {
    try{
      return await Shopping_cart.findAll()
    }catch( error ){
      throw new Error( 'Error al obtener el carrito de compras' )
    }
  },

  buyToCartControllers: async ( {cartId, product, cartTotal}) => {
    console.log('cart',cartId,'product:', product,'cartTotal:', cartTotal)
    try {
      const cart = await Shopping_cart.findByPk(cartId);
      console.log(cart)
      if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado.' });
      }

      
  
    cart.products = product;
 
    // Agregar el valor de cartTotal al array 'total'
    cart.total = cartTotal;

      await cart.save();

   
  
      return cart;
    } catch (error) {
      console.error(error)
      throw new Error('Error al agregar el producto al carrito');
    }
  },

  cancelToCartControllers: async ( {cartId, product, cartTotal}) => {
    console.log(product)
    console.log(cartId)
    try {
      const cart = await Shopping_cart.findByPk(cartId);
      console.log(cart)
      if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado.' });
      }
  
    cart.products = product;
      // Agregar el valor de cartTotal al array 'total'
    cart.total = cartTotal;
    cart.estado_pedido = 'Cancelado'

      await cart.save();
  
      return cart;
    } catch (error) {
      console.error(error)
      throw new Error('Error al agregar el producto al carrito');
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
  buySuccessControllers: async ( { cartId, userId }) => {
    try {
      const cart = await Shopping_cart.findByPk(cartId);
      if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado.' });
      }

    cart.estado_pedido = 'Pago Aprobado'

    await cart.save();

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

const productsPurchased = cart.products.map(product => product.name); // Suponiendo que el objeto de producto tiene un campo "name"
const totalPaid = cart.total; // Suponiendo que "cart.total" ya contiene el monto total pagado
const currentDate = new Date(); // Obtiene la fecha y hora actual


const to = user.email; // Utiliza la dirección de correo electrónico del usuario
const subject = 'Confirmación de pago exitoso';
const text = `
  ¡Hola ${user.name}!

  Queremos confirmarte que tu pago ha sido exitoso y se ha procesado correctamente. ¡Gracias por tu compra!

  Detalles del pago:
  - Productos comprados: ${productsPurchased.join(', ')}
  - Total pagado: $${totalPaid.toFixed(2)} 
  - Fecha de compra: ${currentDate.toLocaleString()} 
  
  Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte.

  ¡Esperamos que disfrutes de tus productos!

  ¡Saludos,
  El equipo de [Nombre de tu empresa]
`;
await sendEmail(to, subject, text);

  
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