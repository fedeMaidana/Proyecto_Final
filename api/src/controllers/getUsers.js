const { User } = require( '../db' )
const { Product } = require( '../db' )

const getUsers = async () => {
    const dataBaseUsers = await User.findAll({
        where: { estado: 1 },
        include: Product
    })

    const usersWithoutPassword = dataBaseUsers.map( user => {
        const { password, ...userWithoutPassword } = user.toJSON()
        return userWithoutPassword
    })

    return [ ...usersWithoutPassword ]
}

module.exports = { getUsers }