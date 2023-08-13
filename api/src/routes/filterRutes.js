const express = require( 'express' )
const filterRouter = express.Router()

const FilterHandlers = require( '../handlers/FiltersHandlers' )

filterRouter.get( '/', FilterHandlers )

module.exports = filterRouter