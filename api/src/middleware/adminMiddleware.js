const jwt = require('jsonwebtoken');
const { User } = require('../db');

const adminMiddleware = async (req, res, next) => {
  const token = req.header('token');

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({ where: { id: decodedToken.id } });

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    if (user.role !== 'rootAdmin') {
      return res.status(403).json({ message: 'Acceso denegado: se requieren privilegios de administrador root' });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = adminMiddleware;
