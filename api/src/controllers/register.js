const { User } = require( '../db' )
const bcrypt = require( 'bcrypt' )


const register = async ( name, email, password, userName, lastName, birthDate, profileImage, role ) => {
  
  
  const user = await User.findOne( { where: { email } } )
  const userNames = await User.findOne( { where: { userName } } )
  
  if( user ) return { message: 'Ya hay un usuario con este Email' }
  if (userNames) return { message: 'Ya hay un usuario con este Username' }
  
  if( !name  || !email || !password ||  !userName  || !lastName || !birthDate ) return { message: 'Faltan datos' }

  else{
    const passwordHash = await bcrypt.hash( password, 10 )

    const newUser = await User.create( { name, email, userName, lastName, birthDate, profileImage, role, password: passwordHash } )

    const responseUser = {
      id: newUser.id,
      name: newUser.name,
      lastName: newUser.lastName,
      userName: newUser.userName,
      email: newUser.email,
      birthDate: newUser.birthDate,
      profileImage: newUser.profileImage,
      estado: newUser.estado,
      role: newUser.role
    }

    return { message: 'Usuario creado correctamente!', valid: true, user: responseUser }
  }
}

module.exports = { register }