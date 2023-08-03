<<<<<<< HEAD
const { Sequelize,DataTypes } = require("sequelize");
=======
const { sequelize, DataTypes } = require("sequelize");
>>>>>>> b988bff30f863a47a6f3cdd2de374cbedb72ed74


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
<<<<<<< HEAD
            allowNull: false,
=======
            required: true,
>>>>>>> b988bff30f863a47a6f3cdd2de374cbedb72ed74
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