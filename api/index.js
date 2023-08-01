const server = require('./src/app');
const { conn } = require('./src/db');
require('dotenv').config();
const PORT = process.env.PORT || 3001

server.listen(3001, () => {
    conn.sync({ force: true });
    console.log("listening on port 3001");
})