const { DataTypes } = require( 'sequelize' )

module.exports = ( sequilize ) => {
  sequilize.define( 'User',
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
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      lastName: {
          type: DataTypes.STRING,
          allowNull: false, 
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      birthDate: {
          type: DataTypes.DATEONLY,
          allowNull: false, 
      },
      profileImage: {
          type: DataTypes.STRING, 
          allowNull: true, 
      },
      estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    }, { timestamps: false }
  )
}
