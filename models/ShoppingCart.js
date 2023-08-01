const { Sequelize } = require("sequelize");


module.exports = (sequelize) =>{
    sequelize.define('shopping_cart',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
    })
}