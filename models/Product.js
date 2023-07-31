const { Sequelize, DataTypes } = require("sequelize");


module.exports = (sequelize) =>{
    sequelize.define('product',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING,
        },
        description:{
            type:DataTypes.TEXT
        },
        price:{
            type: DataTypes.DECIMAL(15, 2)
        },
        image:{
            type:DataTypes.TEXT
        },
        stock:{
            type:DataTypes.INTEGER
        },
        publication_date:{
            type:DataTypes.DATE
        }

    })
}