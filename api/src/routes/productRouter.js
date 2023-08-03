const {Router} = require('express');
const { getProductsHandler, getProductsHandlerById, postProductHandler} = require('../handlers/productsHandler');

const productRouter = Router();

productRouter.post('/', postProductHandler);
productRouter.get('/', getProductsHandler);
productRouter.get('/:id', getProductsHandlerById);

module.exports = productRouter;