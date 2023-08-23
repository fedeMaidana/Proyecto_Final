const { getProducts, getProductsById, getProductsByName } = require( '../controllers/getProducts' )
const { createProduct } = require( '../controllers/postProdcuts' )
const removedProductControllers =require ('../controllers/RemoveProductControllers')

const getProductsNameHandler = async ( req, res ) => {
    const { name } = req.query
    try{
        const response = await getProductsByName( name )
        res.status( 200 ).json( response )
    }catch( error ){
        res.status( 500 ).json( { error: error.message, description: 'no se encontraron prendas' } )
    }
}

const getProductsHandler = async ( req, res ) => {
    try{
        const response = await getProducts( )
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
        const { idUser, name, price, description, stock, category, color, size, stateShare } = req.body
        console.log(idUser, name, price, description, stock, category, color, size, stateShare)
        const images = req.files


        const response = await createProduct( idUser, name, price, description, stock, images, category, color, size, stateShare )

        if( response instanceof Error ) res.status( 400 ).json( { error: response.message } )
        else res.status( 201 ).json( { response, message: 'Se creó correctamente el producto' } )
    }catch( error ){
        res.status( 500 ).json( { error: error.message } )
    }
}

const removedProduct= async ( req, res ) => {
    try{
      const {id} = req.params
      const removedProduct = await removedProductControllers( id )

      res.json( removedProduct )
    }catch( error ){
      res.status( 500 ).json( { error: error.message } )
    }

}


module.exports = { getProductsHandler, getProductsHandlerById, postProductHandler, getProductsNameHandler, removedProduct }