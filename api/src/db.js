const { Sequelize } = require('sequelize');
// importar los models


require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pf-prueba`, {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});


// ejecuntarlos:  modelo(sequelize);


// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring


// const { } = sequelize.models;

// Aca vendrian las relaciones



module.exports = {
    // ...sequelize.models, // para poder importar los modelos
    conn: sequelize,
}