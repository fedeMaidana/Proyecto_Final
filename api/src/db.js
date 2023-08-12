const { Sequelize } = require( 'sequelize' )
const ProductModel = require( './models/Product' )
const ShoppingCartModel = require ( './models/ShoppingCart' )
const UserModel = require( './models/User' )
const CategoryModel = require( './models/Category' )

require( 'dotenv' ).config()

const { DB_USER, DB_PASSWORD, DB_HOST,DB_NAME, DB_PORT } = process.env

const sequelize = new Sequelize( `postgres://${ DB_USER }:${ DB_PASSWORD }@${ DB_HOST }:${ DB_PORT }/${ DB_NAME }`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
})

ProductModel( sequelize )
ShoppingCartModel( sequelize )
UserModel( sequelize )
CategoryModel( sequelize )

const { Product, Shopping_cart, User, Category } = sequelize.models

Product.belongsToMany( Shopping_cart, { through: "Product_Shopping_cart", timestamps: false } )
Shopping_cart.belongsToMany( Product, { through: "Product_Shopping_cart", timestamps: false } )

User.hasMany( Shopping_cart, { foreignKey: 'userId' } )
Shopping_cart.belongsTo( User, { foreignKey: 'userId' } )

Product.belongsTo( Category, { foreignKey: "categoryId" } )
Category.hasMany( Product, { foreignKey: "categoryId" } )

User.hasMany( Product, { foreignKey: "userId" } )
Product.belongsTo( User, { foreignKey: "userId" } )

module.exports = { ...sequelize.models, conn: sequelize }