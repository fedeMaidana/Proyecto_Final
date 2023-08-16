const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('token');

  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // Verificar si el token está a punto de expirar (por ejemplo, en los próximos 5 minutos)
    const now = Date.now() / 1000; // Fecha actual en segundos
    const expiresInMinutes = 5;
    if (decodedToken.exp - now <= expiresInMinutes * 60) {
      // Generar un nuevo token y enviarlo en la respuesta
      const newToken = jwt.sign({ id: decodedToken.id }, process.env.SECRET_KEY, {
        expiresIn: '1h', // Puedes ajustar el tiempo de expiración según tus necesidades
      });
      res.setHeader('new-token', newToken); // Envía el nuevo token en el encabezado
    }

    // Asignar el usuario decodificado al objeto de solicitud (req) para que esté disponible en las rutas
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;
