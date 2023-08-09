const { DataTypes } = require( 'sequelize' )

module.exports = ( sequilize ) => {
  sequilize.define( 'Product',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      images: {
        type: DataTypes.ARRAY( DataTypes.STRING )
      },
      color: {
        type: DataTypes.STRING
      },
      size: {
        type: DataTypes.STRING
      }
    }, { timestamps: false }
  )
}