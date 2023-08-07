const { DataTypes, Sequelize } = require("sequelize")


module.exports = (sequilize) =>{
    sequilize.define('Product',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          price: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          images: {
            type: DataTypes.STRING,
          },
          
    },
    { timestamps: false })
}