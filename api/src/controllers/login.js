const { User } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (email, password) => {

    const user = await User.findOne({ where: { email, estado: 1 }});

    if (!user) {
        return { message: 'Usuario no encontrado', valid: false };

    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if(isCorrect) {
        const { id, name } = user;
        
        const userForToken = {
            id: id,
            name: name
        }

        const token = jwt.sign(userForToken, process.env.SECRET_KEY, { 
            expiresIn: 86400 //24hs
        })

        return { 
            message: "El usuario inició sesión con éxito", valid: true,
            user: {
                id,
                name, 
                token
            },
        };
    }
    else {
        return { message: 'Contraseña incorrecta', valid: false };
    }

};


module.exports = {
    login
}
