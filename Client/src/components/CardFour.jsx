import { useDispatch } from 'react-redux'
import { useState } from 'react'

import { banUser, changeRole, getUsers, getUsersByName } from '../redux/actions'
import orderBy from 'lodash/orderBy'

const CardFour = ({ totalUsers, users }) => {
  const dispatch = useDispatch();

  const [searchName, setSearchName] = useState('')
  const [sortType, setSortType] = useState('asc')
  const [roleFilter, setRoleFilter] = useState('all')

  const handleBanUser = (id) => {
    dispatch(banUser(id)).then(() => {
      dispatch(getUsers()); // Llama a getUsers después de ejecutar banUser
    })
  }

  const handleChangeRole = (id) => {
    dispatch(changeRole(id)).then(() => {
      dispatch(getUsers()); // Llama a getUsers después de ejecutar banUser
    })
  }

  const handleSearch = () => {
    dispatch(getUsersByName(searchName))
  }


  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-[1.875rem] shadow-default dark:border-strokedark dark:bg-boxdark">

      <div className="flex justify-center">
        <div className='flex gap-[10px]'>
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border border-gray-300 p-2 rounded outline-none rounded-[10px]"
          />
          <button
            onClick={handleSearch}
            className="bg-[#33a1fd] text-[1.2rem] font-semibold text-white px-4 py-2 rounded-[10px]"
          >
            Search
          </button>
          {/* Filtro de A-Z */}
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 p-2 rounded-[10px] outline-none"
          >
            <option value="asc">A a la Z</option>
            <option value="desc">Z a la A</option>
          </select>
          {/* Filtro de rol */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded-[10px] outline-none"
          >
            <option value="all">All</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex">
        <span className=" text-[1.5rem] font-medium ">Total de usuarios: {totalUsers} </span>
        <div className='mb-10'>
          {/*  número de usuarios que tienen el rol de "admin" o "user"  */}
          {roleFilter === 'admin' && (
            <p className=" text-[15px] font-medium ">
              Usuarios Admin: {users.filter(user => user.role === 'admin').length}
            </p>
          )}
          {roleFilter === 'user' && (
            <p className=" text-[15px] font-medium ">
              Usuarios: {users.filter(user => user.role === 'user').length}
            </p>
          )}
        </div>
      </div>
      <br />
      <div className='w-full flex flex-wrap gap-[10px] justify-center'>
        {orderBy(
          users.filter((user) => {
            if (roleFilter === 'all') return true;
            return user.role === roleFilter;
          }),
          [(user) =>
            sortType === 'asc'
              ? user.name.toLowerCase()
              : user.lastName.toLowerCase()
          ],
          [sortType]
        ).map((user) => (
          <div
            key={user.id}
            className="w-[45%] border p-5 flex items-center justify-between gap-[10px]"
          >
            <p className="text-lg text-gray-600 ">
              {user.name} {user.lastName}
            </p>
            <span>
              <button
                onClick={() => handleBanUser(user.id)}
                className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300 ease-in-out">
                {user.estado === 1 ? 'Bloquear usuario' : 'Desbloquear usuario'}
              </button>
              <br />
              <button
                onClick={() => handleChangeRole(user.id)}
                className="mt-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
                {user.role === 'user' ? 'Convertir en admin' : 'Convertir en usuario'}
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

  export default CardFour