const { Op } = require( 'sequelize' )
const { Category, Product } = require( '../db' )

const filter = async ( req, res ) => {
    const { category, min_price = 0, max_price = Infinity, sortOption = 'default' } = req.query

    try{
        let filteredProducts = await Product.findAll({
            where: {
                '$Category.name$': category || { [ Op.ne ]: null },
                price: { [ Op.between ]: [ parseFloat( min_price ), parseFloat( max_price ) ] }
            },
            include: {
                model: Category,
                attributes: [],
            }
        })

        if( sortOption === 'priceAsc' ) filteredProducts.sort( ( a, b ) => a.price - b.price )
        else if( sortOption === 'priceDesc' ) filteredProducts.sort( ( a, b ) => b.price - a.price )
        else if( sortOption === 'nameAsc' ) filteredProducts.sort( ( a, b ) => a.name.localeCompare( b.name ) )
        else if ( sortOption === 'nameDesc' ) filteredProducts.sort( ( a, b ) => b.name.localeCompare( a.name ) )

        res.json( filteredProducts )

    }catch( error ){
        res.status( 500 ).json( { error: 'Error fetching products' } )
    }
}

module.exports = filter