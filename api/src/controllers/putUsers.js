const bcrypt = require('bcrypt');
const { User } = require('../db');
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
}).single('profileImage'); // Especifica el campo en el formulario que contendrá la imagen

const updateUser = async (id, name, email, password, userName, lastName, birthDate, profileImage) => {
  try {
    let user = await User.findByPk(id);

    if (!user) {
      return { message: 'Usuario no encontrado' };
    }

        // Verificar si se está intentando cambiar el correo electrónico
        if (email && email !== user.email) {
          const existingUser = await User.findOne({ where: { email } });
          if (existingUser && existingUser.id !== user.id) {
            return { message: 'Ya hay un usuario con este Email' };
          }
          user.email = email;
        }
    
        // Verificar si se está intentando cambiar el nombre de usuario
        if (userName && userName !== user.userName) {
          const existingUserName = await User.findOne({ where: { userName } });
          if (existingUserName && existingUserName.id !== user.id) {
            return { message: 'Ya hay un usuario con este Username' };
          }
          user.userName = userName;
        }
    
        // Actualizar otros campos si se proporcionan
        if (name) user.name = name;
        if (lastName) user.lastName = lastName;
        if (birthDate) user.birthDate = birthDate;
        if (profileImage) user.profileImage = profileImage;
    
        // Actualizar la contraseña si se proporciona una nueva
        if (password) {
          const passwordHash = await bcrypt.hash(password, 10);
          user.password = passwordHash;
        }

        if (profileImage) {
          const baseUrl = 'https://proyectofinal-production-4957.up.railway.app/'; // Cambiar esto al hacer deploy
          const imageUrl = `/upload/${profileImage.filename}`;
          const fullImageUrl = baseUrl + imageUrl;
          user.profileImage = fullImageUrl;
        }
    

    await user.save();

    return {
      message: 'Datos de usuario actualizados correctamente!',
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        birthDate: user.birthDate,
        profileImage: user.profileImage,
        estado: user.estado,
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error('Ha ocurrido un error en el servidor');
  }
};

module.exports = {
  updateUser,
  
};
