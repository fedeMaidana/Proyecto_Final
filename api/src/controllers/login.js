const { User } = require('../db');
const bcrypt = require('bcrypt');


const login = async (email, password) => {

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return { message: 'User not found' };

    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if(isCorrect) {
        const { id, name } = user;
            
        return { 
            message: "User logged in successfully",
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
