const path = require( 'path' )
const multer = require( 'multer' )
const { Product } = require( '../db' )

const uploadDirectory = path.join( __dirname, '../upload' )

const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: ( _req, file, cb ) => {
    const uniqueSuffix = Date.now() + '-' + Math.round( Math.random() * 1E9 )
    const fileExtension = path.extname( file.originalname )
    const newFilename = uniqueSuffix + fileExtension

    cb( null, newFilename )
  }
})

const upload = multer({
  storage: storage,
  fileFilter: ( _req, file, cb ) => {
    const allowedExtensions = [ '.png', '.jpg', '.webp' ]
    const fileExtension = path.extname( file.originalname ).toLowerCase()

    if( allowedExtensions.includes( fileExtension ) ) cb( null, true )
    else cb( new Error( 'Tipo de archivo no válido' ) )
  }
})

const createProduct = async ( idUser, name, price, description, stock, images, category, color, size, stateShare ) => {
  try{
    if( !idUser || !name || !price || !description || !stock || !images || !category || !color || !size || !stateShare ){
      throw new Error ( 'Faltan datos' )
    }

    const formattedName =
      name
        .toLowerCase()
        .split( ' ' )
        .map( word => word.charAt( 0 ).toUpperCase() + word.substring( 1 ).toLowerCase() )
        .join( ' ' )

    const imageUrls = await Promise.all( images.map( async ( image ) => {
      const imageUrl = `/upload/${ image.filename }`

      return imageUrl
    }))

    const product = await Product.create({
      userId: idUser,
      name: formattedName,
      price,
      description,
      stock,
      images: imageUrls,
      color,
      size,
      categoryId: category,
      stateShare
    })

    return product

  }catch( error ){
    throw new Error( 'Error al crear el producto: ' + error.message )
  }
}

module.exports = { createProduct, upload }