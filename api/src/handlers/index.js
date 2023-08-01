const { getPrueba } = require('../controllers/getPrueba');

const getPruebaHandler = async (req, res) => {

    const result = await getPrueba();
    res.status(200).send(result)
};


module.exports = {
    getPruebaHandler
}