const {Product} = require('../db')


const removedProductControllers = async(id)=>{
    console.log(id)
    try {
        const product= await Product.findByPk(id)
        if( !product ) throw new Error( 'Producto no encontrado en el carrito' )

        await product.destroy()
  
        return {message: 'Producto eliminado con éxito'}
  
    } catch (error) {
        throw new Error('Error al eliminar el producto');
    }
}

module.exports = removedProductControllers