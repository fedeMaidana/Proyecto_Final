const { User } = require( '../db' )
const { getUsers } = require( '../controllers/getUsers' )
const { register } = require( '../controllers/register' )
const { login } = require( '../controllers/login' )
const { deleteUser } = require( '../controllers/deleteUser' )
const { sendWelcomeEmail } = require('../controllers/emailService');

const getUsersHandler = async ( req, res ) => {
    try {
        
        const {name} = req.query;

        const users = await getUsers(name);
    
        res.status( 200 ).send( users )
    } catch (error) {
        res.status( 500 ).json( { error: 'server error' } )
    }
}

const getUserIDHandler = async ( req, res ) => {
    const { id } = req.user

    const totalUsers = await getUsers()
    const userId = totalUsers.find( user => user.id === id )

    if( userId ) res.json( userId )
    else res.json( { mensaje: 'No se encontró ningún usuario con ese Token' } )
}

const registerHandler = async ( req, res ) => {

    const { name, email, password, userName, lastName, birthDate, role } = req.body
    const profileImage = req.file
    console.log(profileImage);

    try{
        const result = await register( name, email, password, userName, lastName, birthDate, profileImage, role )

        await sendWelcomeEmail(email);

        res.status( 200 ).json( result )

    }catch( error ){
        console.error( 'Error al intentar registrarse: ', error )

        res.status( 500 ).json( { error: 'server error' } )
    }
}

const loginHandler = async ( req, res ) => {
    const { email, password } = req.body

    try{
        const result = await login( email, password )

        res.status( 200 ).json( result )

    }catch(error){
        console.error( 'Error al intentar iniciar sesión: ', error )

        res.status( 500 ).json( { error: 'server error' } )
    }
}

const deleteHandler = async ( req, res ) => {
    const { id } = req.params

    try{
        const result = await deleteUser( id )

        res.status( 200 ).json( result )

    }catch( error ){
        console.error( 'Error al borrar el usuario: ', error )

        res.status( 500 ).json( { error: 'server error' } )
    }
}

module.exports = { getUsersHandler, registerHandler, getUserIDHandler, loginHandler, deleteHandler }
