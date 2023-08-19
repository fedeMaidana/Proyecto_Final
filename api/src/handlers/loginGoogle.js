const {User} = require('../db'); 

const getUserDetails = async (req, res) => {
  try {
    // Accede al ID del usuario desde req.user (proporcionado por el middleware)
    const { userId } = req.user;

    // Busca el usuario en la base de datos utilizando el método findByPk
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Envía los detalles del usuario en la respuesta al front
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      
    });
  } catch (error) {
    console.error('Error al obtener detalles del usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = getUserDetails
