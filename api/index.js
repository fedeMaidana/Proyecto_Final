const server = require('./src/app');
const { conn } = require('./src/db');

require('dotenv').config();
const PORT = process.env.PORT || 3001


server.listen(PORT, () => {
    conn.sync({ force: false });
    console.log(`listening on port ${PORT}`);
})