const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('token');
  const googleToken = req.header('googleToken'); // Agrega esta línea para obtener el token de Google

  if (!token && !googleToken) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    if (token) {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      const now = Date.now() / 1000;
      const expiresInMinutes = 5;
      if (decodedToken.exp - now <= expiresInMinutes * 60) {
        const newToken = jwt.sign({ id: decodedToken.id }, process.env.SECRET_KEY, {
          expiresIn: '1h',
        });
        res.setHeader('new-token', newToken);
      }

      req.user = decodedToken;
      next();
    }

    if (googleToken) {
      const decodedGoogleToken = jwt.verify(googleToken, process.env.SECRET_KEY);

      const now = Date.now() / 1000;
      const expiresInMinutes = 5;
      if (decodedGoogleToken.exp - now <= expiresInMinutes * 60) {
        const newToken = jwt.sign({ id: decodedGoogleToken.id }, process.env.SECRET_KEY, {
          expiresIn: '1h',
        });
        res.setHeader('new-google-token', newToken);
      }

      req.user = decodedGoogleToken;
      next();
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;
