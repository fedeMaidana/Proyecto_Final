import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    userName: '',
    lastName: '',
    birthDate: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('informacion-personal'); // Estado para la sección activa

  const { name, email, userName, lastName, birthDate } = inputs;

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get('http://localhost:3001/user', {
            headers: {
              token: `${token}`,
            },
          });
          setUser(response?.data);
        } catch (error) {
          console.error('Error al obtener detalles del usuario:', error);
        }
      };

      fetchUserDetails();
    }
  }, []);

  const navigate = useNavigate();

  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (name !== '' && email !== '' && userName !== '' && lastName !== '' && birthDate !== '') {
      const updatedUser = { name, email, userName, lastName, birthDate };

      setLoading(true);

      try {
        const response = await axios.put(`http://localhost:3001/updateuser/${user.id}`, updatedUser);
        setMessage(response.data.message);
        setInputs({ name: '', email: '', userName: '', lastName: '', birthDate: '' });

        setTimeout(() => {
          setMessage('');
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error(error);
        setMessage('Hubo un error al actualizar el usuario');
        setTimeout(() => {
          setMessage('');
        }, 1500);
      }
    }
  };

  return (
    <div className="flex container mx-auto py-4">
      <div className="w-1/4 bg-gray-200 p-4 rounded mr-4">
        <ul className="space-y-2">
          <li className={`text-2xl font-semibold ${activeSection === 'informacion-personal' && 'text-blue-500'}`}>
            <Link to="#informacion-personal" onClick={() => setActiveSection('informacion-personal')}>
              Información Personal / Datos de Cuenta
            </Link>
          </li>
          <li className={`text-2xl font-semibold ${activeSection === 'productos-creados' && 'text-blue-500'}`}>
            <Link to="#productos-creados" onClick={() => setActiveSection('productos-creados')}>
              Productos Creados
            </Link>
          </li>
          <li className={`text-2xl font-semibold ${activeSection === 'actualizar-usuario' && 'text-blue-500'}`}>
            <Link to="#actualizar-usuario" onClick={() => setActiveSection('actualizar-usuario')}>
              Actualizar Usuario
            </Link>
          </li>
        </ul>
      </div>

      <div className="w-3/4">
        <div className="mb-4">
          <a href="/home" className="flex items-center text-blue-500 hover:underline text-2xl">
            <FaArrowLeft className="mr-2" /> Volver a Home
          </a>
        </div>

        {user ? (
          <div className="bg-gray-100 p-4 rounded mb-4" id="informacion-personal">
            {activeSection === 'informacion-personal' && (
              <>
                <h3 className="text-lg font-semibold">Información Personal</h3>
                <div className="mt-4">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Last Name:</strong> {user.lastName}</p>
                  <p><strong>Birth Date:</strong> {user.birthDate}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Username:</strong> {user.userName}</p>
                </div>
              </>
            )}
          </div>
        ) : (
          <p>Loading user information...</p>
        )}

        {user && user.Products && user.Products.length > 0 && (
          <div className="bg-white p-4 rounded mb-4" id="productos-creados">
            {activeSection === 'productos-creados' && (
              <>
                <h3 className="text-lg font-semibold mb-4">Productos Creados</h3>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {user.Products.map((product) => (
                    <div
                    key={product.id}
                    className="w-[90%] h-[300px] bg-white rounded-[10px] grid grid-cols-2 grid-rows-4 p-[10px] border border-[#e7e9ec]"
                  >
                    <div className="flex items-center gap-[10px] row-span-1 border-b-[1px]">
                      <span className="w-[50px] h-[50px] rounded-full bg-[#b7bbc3]"></span>
                      <p className="text-[2rem] font-semibold">{user.name}</p>
                    </div>
        
                    <div className="flex items-center justify-between border-l-[1px] border-b-[1px] pl-[10px]">
                      <h3 className="text-[3rem] font-bold">{product.name}</h3>
                      <p className="text-[2rem] font-semibold">{`$${product.price}`}</p>
                    </div>
        
                    <div className="flex justify-center row-span-3 border-r-[1px]">
                      {/* Your images mapping logic here */}
                    </div>
        
                    <div className="flex flex-col items-center justify-around row-span-3">
                      <h3 className="text-[2rem] font-semibold">Sobre el producto</h3>
                      <p className="text-[1.5rem]">{product.description}</p>
                    </div>
        
                  </div>
        
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {user && (
          <div className="bg-white p-4 rounded" id="actualizar-usuario">
            {activeSection === 'actualizar-usuario' && (
              <>
                <h3 className="text-lg font-semibold mb-4">Actualizar Información de Usuario</h3>
                <form onSubmit={onSubmit}>
                <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold text-xl mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold text-xl mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="userName" className="block text-gray-700 font-semibold text-xl mb-2">Username</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={userName}
                onChange={onChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-700 font-semibold text-xl mb-2">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={onChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="birthDate" className="block text-gray-700 font-semibold text-xl mb-2">Birth Date</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={birthDate}
                onChange={onChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 text-xl"
            >
              Actualizar Usuario
            </button>

                </form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
