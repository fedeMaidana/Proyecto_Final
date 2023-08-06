const { User } = require('../db')


const deleteUser = async (id) => {

    const user = await User.findByPk(id);
    
    if(!user) {
        return { message: 'Usuario no encontrado'};
    }

    await user.update({ estado: 0 });  

    return { message: 'Usuario eliminado correctamente'}

};





module.exports = {
    deleteUser,
}