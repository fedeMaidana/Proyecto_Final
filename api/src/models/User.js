const { Sequelize } = require("sequelize");


module.exports = (sequilize) => {
    sequilize.define('User',{
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
    },
    { timestamps: false })
}