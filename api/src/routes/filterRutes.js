const express = require('express');
const filterRouter = express.Router();

const filter = require('../Filters/filters')

filterRouter.get('/', filter)


module.exports = filterRouter;