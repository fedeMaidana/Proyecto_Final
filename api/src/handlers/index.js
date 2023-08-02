const { getPrueba } = require('../controllers/getPrueba');
const {getProducts, getProductsById} = require('../controllers/getProducts')

const getPruebaHandler = async (req, res) => {

    const result = await getPrueba();
    res.status(200).send(result)
};
const getProductsHandler = async (req, res) => {
    const {name} = req.query;
    try {
        const response = await getProducts(name);
        res.status(200).json(response);
    } catch (error) {
        res.status(200).json({error:error.message,description:'no se encontraron prendas'})
    };
};

const getProductsHandlerById = async (req, res) =>{
    const {id } = req.params;
    try {
        const response = await getProductsById(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message,description:'no se encontraron prendas con ese id'})
    };
};


module.exports = {
    getPruebaHandler,
    getProductsHandler,
    getProductsHandlerById
}