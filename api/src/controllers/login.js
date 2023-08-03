const { User } = require('../db');
const bcrypt = require('bcrypt');


const login = async (email, password) => {

    const user = await User.findOne({ where: { email, estado: 1 }});

    if (!user) {
        return { message: 'Usuario no encontrado' };

    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if(isCorrect) {
        const { id, name } = user;
            
        return { 
            message: "El usuario inició sesión con éxito",
            user: {
                id,
                name
            },
        };
    }
    else {
        return { message: 'Incorrect password' };
    }

};


module.exports = {
    login
}