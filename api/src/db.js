const { Sequelize } = require( 'sequelize' );
const ProductModel = require( './models/Product' );
const ShoppingCartModel = require ( './models/ShoppingCart' );
const UserModel = require( './models/User' );
const CategoryModel = require( './models/Category' );
const FavoriteModel = require ('./models/Favorite');
const CommentsModel = require ('./models/Comments')

require( 'dotenv' ).config()

const { DB_USER, DB_PASSWORD, DB_HOST,DB_NAME, DB_PORT } = process.env

const sequelize = new Sequelize( `postgres://${ DB_USER }:${ DB_PASSWORD }@${ DB_HOST }:${ DB_PORT }/${ DB_NAME }`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
})

ProductModel( sequelize );
ShoppingCartModel( sequelize );
UserModel( sequelize );
CategoryModel( sequelize );
FavoriteModel( sequelize);
CommentsModel(sequelize);

const { Product, Shopping_cart, User, Category, Favorite, Comment } = sequelize.models

Product.belongsToMany( Shopping_cart, { through: "Product_Shopping_cart", timestamps: false } );
Shopping_cart.belongsToMany( Product, { through: "Product_Shopping_cart", timestamps: false } );

User.hasMany( Shopping_cart, { foreignKey: 'userId' } );
Shopping_cart.belongsTo( User, { foreignKey: 'userId' } );

Product.belongsTo( Category, { foreignKey: "categoryId" } );
Category.hasMany( Product, { foreignKey: "categoryId" } );

User.hasMany( Product, { foreignKey: "userId",  as: "CreatedProducts"  } );
Product.belongsTo( User, { foreignKey: "userId", as: "CreatedProducts"  } );

User.belongsToMany(Product, { through: Favorite,as: "FavoriteProducts", timestamps: false });
Product.belongsToMany(User, { through: Favorite,as: "FavoriteProducts", timestamps: false });


User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Comment, { foreignKey: 'productId' });
Comment.belongsTo(Product, { foreignKey: 'productId' });
// Al final de db.js
(async () => {
  try {
      await sequelize.sync(); // Sincroniza todos los modelos con la base de datos
      console.log('Modelos sincronizados correctamente.');
  } catch (error) {
      console.error('Error al sincronizar modelos:', error);
  }
})();


module.exports = { ...sequelize.models, conn: sequelize }
