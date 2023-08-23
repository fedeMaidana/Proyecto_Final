const { User } = require( '../db' )
const bcrypt = require( 'bcrypt' )
const path = require('path');
const multer = require('multer');

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

    if (!file) {
      cb(null, true);
      return;
    }
    const allowedExtensions = ['.png', '.jpg', '.webp'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
  
    if (allowedExtensions.includes(fileExtension)) {
      cb(null, true); // Aceptar el archivo
    } else {
      cb(new Error('Tipo de archivo no válido'));
    }
  },
});


const register = async ( name, email, password, userName, lastName, birthDate, profileImage, role ) => {
  
  
  const user = await User.findOne( { where: { email } } )
  const userNames = await User.findOne( { where: { userName } } )
  
  if( user ) return { message: 'Ya hay un usuario con este Email' }
  if (userNames) return { message: 'Ya hay un usuario con este Username' }
  
  if( !name  || !email || !password ||  !userName  || !lastName || !birthDate ) return { message: 'Faltan datos' }

  else{
    const passwordHash = await bcrypt.hash( password, 10 )

    let fullImageUrl = null;
    if(profileImage){
      const baseUrl = 'https://proyectofinal-production-4957.up.railway.app/'; // Cambiar esto al hacer deploy
      const imageUrl = `/upload/${profileImage.filename}`; 
      fullImageUrl = baseUrl + imageUrl
    }

    
    const newUser = await User.create( { name, email, userName, lastName, birthDate, profileImage: fullImageUrl, password: passwordHash, role } )

    const responseUser = {
      id: newUser.id,
      name: newUser.name,
      lastName: newUser.lastName,
      userName: newUser.userName,
      email: newUser.email,
      birthDate: newUser.birthDate,
      profileImage: newUser.profileImage,
      estado: newUser.estado,
      role: newUser.role
    }

    return { message: 'Usuario creado correctamente!', valid: true, user: responseUser }
  }
}

module.exports = { register, upload }