const { User } = require("../db");



const changeRole = async ( req, res ) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({ where: { id: id } });

        if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (user.role === 'admin') {
            user.role = 'user';
            await user.save();
        }
        else {
            user.role = 'admin';
            await user.save();
        }
        

        return res.status(200).json({ message: 'Rol de usuario actualizado con éxito', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al cambiar el rol del usuario' });
    }
};


module.exports = { changeRole };