const { User } = require( '../db' )

const deleteUser = async ( id ) => {
    const user = await User.findByPk( id )

    if( !user ) return { message: 'Usuario no encontrado' }

    // await user.update( { estado: 0 } )

    if (user.estado === 0) {
        user.estado = 1;
        await user.save();
        return { message: 'Usuario desbaneado correctamente' }
    }
    else {
        user.estado = 0;
        await user.save();
        return { message: 'Usuario baneado correctamente' }
    }

}

module.exports = { deleteUser }