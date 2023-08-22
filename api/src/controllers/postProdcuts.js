const path = require('path');
const multer = require('multer');
const { Product } = require('../db');

const uploadDirectory = path.join(__dirname, '../upload'); // Ruta a la carpeta "upload"

// Configuración de multer
const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: (req, file, cb) => {
    const originalFileName = path.parse(file.originalname).name; // Obtener el nombre original del archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname); // Obtener la extensión del archivo original
    const newFilename = `${originalFileName}_${uniqueSuffix}${fileExtension}`; // Combinar todo
    cb(null, newFilename);
  },
});

  
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const allowedExtensions = ['.png', '.jpg', '.webp'];
      const fileExtension = path.extname(file.originalname).toLowerCase();
  
      if (allowedExtensions.includes(fileExtension)) {
        cb(null, true); // Aceptar el archivo
      } else {
        cb(new Error('Tipo de archivo no válido'));
      }
    },
  });

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

      console.log(images);
      const baseUrl = 'https://proyectofinal-production-4957.up.railway.app/'; // Cambiar esto al hacer deploy
      
      const imageUrls = await Promise.all(images.map(async (image) => {
        const imageUrl = `/upload/${image.filename}`; 
        const fullImageUrl = baseUrl + imageUrl; // URL completa de la imagen

        return fullImageUrl;
      }));

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

    return product;

  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error);
    throw new Error('Error al crear el producto: ' + error.message);
  }
};

module.exports = {
  createProduct,
  upload
}