const { Sequelize } = require('sequelize');
// importar los models
const ProductModel = require('./models/Product')
const ShoppingCartModel = require ('./models/ShoppingCart')
const UserModel = require('./models/User')


require('dotenv').config();
const {
    DB_USER, DB_PASSWORD, DB_HOST,DB_NAME, DB_PORT
  } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

// ejecuntarlos:  modelo(sequelize);
ProductModel(sequelize)
ShoppingCartModel(sequelize)
UserModel(sequelize)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring


const {Product, Shopping_cart, User } = sequelize.models;

// Aca vendrian las relaciones

Product.belongsToMany(Shopping_cart, { through: "Product_Shopping_cart",timestamps: false });
Shopping_cart.belongsToMany(Product, { through: "Product_Shopping_cart",timestamps: false });

module.exports = {
    ...sequelize.models, // para poder importar los modelos
    conn: sequelize,
}