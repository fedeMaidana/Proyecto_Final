const {Router} = require('express');
const { getProductsHandler, getProductsHandlerById} = require('../handlers/index');

const productRouter = Router();

productRouter.get('/', getProductsHandler);
productRouter.get('/:id', getProductsHandlerById);

module.exports = productRouter;