const { Sequelize,DataTypes } = require("sequelize");



module.exports = (sequilize) => {
    sequilize.define('User',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
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
              isEmail: true,
            },
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          estado: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1, 
          },
    },
    { timestamps: false })
}
