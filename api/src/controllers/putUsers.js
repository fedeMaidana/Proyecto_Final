const bcrypt = require('bcrypt');
const { User } = require('../db');

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
