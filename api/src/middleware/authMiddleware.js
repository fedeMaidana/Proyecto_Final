const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('token');
      
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decodedToken;
      next();

    } catch (error) {
      return res.status(401).json({ message: 'Token inválido' });
    }
};


  
  module.exports = authMiddleware;