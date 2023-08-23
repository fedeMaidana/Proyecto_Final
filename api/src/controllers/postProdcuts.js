// const path = require('path');
// const multer = require('multer');
// const { Product } = require('../db');

// const uploadDirectory = path.join(__dirname, '../upload'); // Ruta a la carpeta "upload"

// // Configuración de multer
// const storage = multer.diskStorage({
//   destination: uploadDirectory,
//   filename: (req, file, cb) => {
//     const originalFileName = path.parse(file.originalname).name; // Obtener el nombre original del archivo
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const fileExtension = path.extname(file.originalname); // Obtener la extensión del archivo original
//     const newFilename = `${originalFileName}_${uniqueSuffix}${fileExtension}`; // Combinar todo
//     cb(null, newFilename);
//   },
// });

  
//   const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//       const allowedExtensions = ['.png', '.jpg', '.webp'];
//       const fileExtension = path.extname(file.originalname).toLowerCase();
  
//       if (allowedExtensions.includes(fileExtension)) {
//         cb(null, true); // Aceptar el archivo
//       } else {
//         cb(new Error('Tipo de archivo no válido'));
//       }
//     },
//   });

// const createProduct = async ( idUser, name, price, description, stock, images, category, color, size, stateShare ) => {
//   try{
//     if( !idUser || !name || !price || !description || !stock || !images || !category || !color || !size || !stateShare ){
//       throw new Error ( 'Faltan datos' )
//     }

//     const formattedName =
//       name
//         .toLowerCase()
//         .split( ' ' )
//         .map( word => word.charAt( 0 ).toUpperCase() + word.substring( 1 ).toLowerCase() )
//         .join( ' ' )

//       console.log(images);
//       const baseUrl = 'https://proyectofinal-production-4957.up.railway.app'; // Cambiar esto al hacer deploy
      
//       const imageUrls = await Promise.all(images.map(async (image) => {
//         const imageUrl = `/upload/${image.filename}`
//         const fullImageUrl = baseUrl + imageUrl; // URL completa de la imagen

//         return fullImageUrl;
//       }));

//     const product = await Product.create({
//       userId: idUser,
//       name: formattedName,
//       price,
//       description,
//       stock,
//       images: imageUrls,
//       color,
//       size,
//       categoryId: category,
//       stateShare
//     })

//     return product;

//   } catch (error) {
//     console.error('Error al agregar el producto al carrito:', error);
//     throw new Error('Error al crear el producto: ' + error.message);
//   }
// };

// module.exports = {
//   createProduct,
//   upload
// }

const path = require('path');
const multer = require('multer');
const axios = require('axios')
const { Product } = require('../db');
const admin = require('firebase-admin');
const serviceAccount = require('../Firebase/customcraft-9f845-firebase-adminsdk-r6wav-a5de728505.json'); // Cambia esto por la ubicación de tu archivo de credenciales de Firebase

// Inicialización de Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://customcraft-9f845.appspot.com' // Cambia esto por el nombre de tu bucket de almacenamiento
});

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

const createProduct = async (idUser, name, price, description, stock, images, category, color, size, stateShare) => {
  try {
    if (!idUser || !name || !price || !description || !stock || !images || !category || !color || !size || !stateShare) {
      throw new Error('Faltan datos');
    }

    const formattedName =
      name
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
        .join(' ');

        const bucket = admin.storage().bucket(); // Obtén la referencia al bucket de almacenamiento de Firebase

        const imageUrls = await Promise.all(images.map(async (image) => {
          const newFilename = image.filename; // El nuevo nombre de archivo generado por multer
        
          // Sube la imagen a Firebase Storage y obtén su URL
          const uploadedFile = await bucket.upload(image.path, {
            destination: `productos/${newFilename}`,
          });
          const imageUrl = await uploadedFile[0].getSignedUrl({
            action: 'read',
            expires: '01-01-3000', // Fecha de expiración de la URL (ajusta según tus necesidades)
          });
        
          const fullImageUrl = imageUrl[0]; // URL completa de la imagen
        
          // Acortar la URL antes de almacenarla
          console.log(`Acortando URL para la imagen ${newFilename}...`);
          try {
            const isgdApiUrl = `https://is.gd/create.php?format=json&url=${encodeURIComponent(fullImageUrl)}`;
            const response = await axios.get(isgdApiUrl);
            const shortUrl = response.data.shorturl;
            console.log(`URL acortada para ${newFilename}: ${shortUrl}`);
            return shortUrl;
          } catch (error) {
            console.error('Error al acortar URL:', error);
            return fullImageUrl; // En caso de error, almacenamos la URL completa
          }
        }));
        
        console.log('URLs acortadas:', imageUrls);

    const product = await Product.create({
      userId: idUser,
      name: formattedName,
      price,
      description,
      stock,
      images: imageUrls, // Ahora asignamos todas las URLs del array
      color,
      size,
      categoryId: category,
      stateShare,
    });

    return product;
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error);
    throw new Error('Error al crear el producto: ' + error.message);
  }
};

module.exports = {
  createProduct,
  upload,
};
