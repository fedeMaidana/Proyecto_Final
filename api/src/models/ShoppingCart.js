const { Sequelize, DataTypes } = require("sequelize");


module.exports = (sequelize) =>{
    sequelize.define('Shopping_cart',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          price_data: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
          },
          adjustable_quantity: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
          },
          quantity: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
          },
    },
    { timestamps: false,
        
            // Método para verificar el stock de un producto en el carrito
            instanceMethods: {
                checkProductStock: async function(productId, quantity) {
                  const product = await sequelize.models.Product.findByPk(productId);
          
                  if (!product) {
                    throw new Error('Producto no encontrado');
                  }
          
                  if (product.stock >= quantity) {
                    return true; // Stock disponible
                  } else {
                    return false; // Stock insuficiente
                  }
                }
 } })
}