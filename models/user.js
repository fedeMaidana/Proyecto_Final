const { Sequelize, DataTypes } = require("sequelize");

module.export= (sequelize)=>{
    sequelize.define('user',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
    })

}