const { Product, User } = require( '../db' )
const { Op } = require( 'sequelize' )

const getProductsByName = async ( name ) => {
    if( name ){
        const productByName = await Product.findAll({
            where: {
                name: {
                    [ Op.iLike ]: `%${ name }%`
                }
            }
        })

        const productFilter = productByName.map( product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            stock: product.stock,
            images: product.images,
            price: product.price
        }))

        return productFilter

    }else{
        return []
    }
}

// const getProducts = async () => {
//     const products = await Product.findAll()

//     const productFilter = products.map( product => ({
//         id: product.id,
//         name: product.name,
//         description: product.description,
//         stock: product.stock,
//         images: product.images,
//         price: product.price
//     }))

//     return productFilter
// }

 // Asegúrate de importar tus modelos correctamente

const getProducts = async () => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: User,
          as: 'CreatedProducts', // Utiliza el alias que has definido en la relación
          attributes: ['id', 'name', 'userName'], // Puedes elegir las propiedades del usuario que deseas incluir
        },
        {
          model: User,
          as: 'FavoriteProducts', // Utiliza el alias que has definido en la relación de favoritos
          attributes: ['id', 'name', 'userName'], // Puedes elegir las propiedades del usuario que deseas incluir
          through: { attributes: [] }, // No incluir atributos de la tabla intermedia
        },
      ],
      attributes: ['id', 'name', 'description', 'stock', 'images', 'price'],
    });

    const productsWithCreatorsAndFavorites = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      stock: product.stock,
      images: product.images,
      price: product.price,
      creator: product.CreatedProducts, // Los datos del usuario creador estarán aquí
      favorites: product.FavoriteProducts, // Los datos de los usuarios favoritos estarán aquí
    }));

    return productsWithCreatorsAndFavorites;
  } catch (error) {
    console.error('Error obteniendo productos, creadores y favoritos:', error);
    throw error;
  }
};

// Llamar a la función y manejar los resultados
// getProductsCreatorsAndFavorites()
//   .then(productsWithCreatorsAndFavorites => {
//     console.log(productsWithCreatorsAndFavorites);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });


const getProductsById = async ( id ) => {
    const products = await Product.findByPk( id )
    const dbdata = [ products ]

    const productFilter = dbdata.map( product => ({
        id: product.id,
        name: product.name,
        description:product.description,
        stock: product.stock,
        images: product.images,
        price: product.price,
    }))

    return productFilter
}

module.exports = { getProductsById, getProducts, getProductsByName }