import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { banUser, changeRole, getUsers, getUsersByName } from '../redux/actions';
import { sort } from 'lodash';
import orderBy from 'lodash/orderBy';

const CardFour = ({ totalUsers, users }) => {
  
  const dispatch = useDispatch();

  const [searchName, setSearchName] = useState('');
  const [sortType, setSortType] = useState('asc'); 
  const [roleFilter, setRoleFilter] = useState('all'); 

  const handleBanUser = (id) => {
    dispatch(banUser(id)).then(() => {
      dispatch(getUsers()); // Llama a getUsers después de ejecutar banUser
    });
  };

  const handleChangeRole = (id) => {
    dispatch(changeRole(id)).then(() => {
      dispatch(getUsers()); // Llama a getUsers después de ejecutar banUser
    }); 
  };

  const handleSearch = () => {
    dispatch(getUsersByName(searchName));
  };


  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-[1.875rem] shadow-default dark:border-strokedark dark:bg-boxdark">
  
      <div className="mt-4 flex items-end justify-between">
        <div>
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
            Search
          </button>
          {/* Filtro de A-Z */}
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 p-2 rounded ml-2"
          >
            <option value="asc">A to Z</option>
            <option value="desc">Z to A</option>
          </select>
          {/* Filtro de rol */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded ml-2"
          >
            <option value="all">All</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

        </div>
      </div>
  
      <div className="flex h-[2.875rem] w-[2.875rem] items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {/* ... (código SVG) */}
      </div>
  
      <div className="mt-4 flex items-end justify-between">
        <div>
          <span className=" text-[22px] text-sm font-medium">Total Users: </span>
          <h4 className="text-[22px] leading-[30px] font-bold text-black">
            {totalUsers}
          </h4>
        </div>
      </div>
      <br />
      <div>
        <h4 className="text-sm font-medium text-black dark:text-white">
          User Names:
        </h4>
        {orderBy(
          users.filter((user) => {
            if (roleFilter === 'all') return true;
            return user.role === roleFilter;
          }),
          [sortType === 'asc' ? 'name' : 'lastName'],
          [sortType] // 'asc' o 'desc'
        ).map((user) => (
          <div
            key={user.id}
            className="rounded-sm border border-stroke bg-white py-2 px-4 shadow-default dark:border-strokedark dark:bg-boxdark mt-2">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {user.name} {user.lastName}
            </p>
            <button
              onClick={() => handleBanUser(user.id)}
              className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300 ease-in-out">
              {user.estado === 1 ? 'Ban' : 'Unban'}
            </button>
            <br />
            <button
              onClick={() => handleChangeRole(user.id)}
              className="mt-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
              {user.role === 'user' ? 'admin' : 'user'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  
};
  
  export default CardFour;
  