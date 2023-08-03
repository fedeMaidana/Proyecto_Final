const express = require('express');
const cartegoryHandler = require('../handlers/CategoryHandlers');

const categoryRouter = express.Router();

categoryRouter.get('/', cartegoryHandler.getCategories);
categoryRouter.get('/:id', cartegoryHandler.getCategoriesId);

categoryRouter.post('/', cartegoryHandler.postCategories);
categoryRouter.put('/:id', cartegoryHandler.putCategories);

categoryRouter.delete('/:id', cartegoryHandler.deleteCategories);


module.exports = categoryRouter;
