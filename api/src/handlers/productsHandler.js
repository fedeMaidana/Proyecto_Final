const { getProducts, getProductsById } = require( '../controllers/getProducts' )
const { createProduct } = require( '../controllers/postProdcuts' )

const getProductsHandler = async ( req, res ) => {
    const { name } = req.query
    try{
        const response = await getProducts( name )
        res.status( 200 ).json( response )
    }catch( error ){
        res.status( 500 ).json( { error: error.message, description: 'no se encontraron prendas' } )
    }
}

const getProductsHandlerById = async ( req, res ) => {
    const { id } = req.params
    try{
        const response = await getProductsById( id )
        res.status( 200 ).json( response )
    }catch( error ){
        res.status( 400 ).json( { error: error.message, description: 'no se encontraron prendas con ese id' } )
    }
}

const postProductHandler = async ( req, res ) => {
    try{
        const { name, price, description, stock, category, color, size } = req.body
        const images = req.files
        const response = await createProduct( name, price, description, stock, images, category, color, size )

        if( response instanceof Error ) res.status( 400 ).json( { error: response.message } )
        else res.status( 201 ).json( { response, message: 'Se creó correctamente el producto' } )
    }catch( error ){
        res.status( 500 ).json( { error: error.message } )
    }
}

module.exports = { getProductsHandler, getProductsHandlerById, postProductHandler }