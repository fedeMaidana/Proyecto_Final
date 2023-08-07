const { User } = require('../db');
const bcrypt = require('bcrypt');


const register = async (name, email, password) => {

  const user = await User.findOne({ where: { email } });

  if (user) {
    return { message: 'Ya hay un usuario con este correo' };
  } 

  else if (!name || !email || !password) {
    return { message: 'missing data' };
  } 

  else {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: passwordHash,

    });

    return { message: 'User created successfully!', user: newUser };
  }

};

module.exports = {
  register
}