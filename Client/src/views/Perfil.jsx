import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { deleteProducts } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
// import { Card } from '../components/Card';

export const ProfilePage = () => {
  const messageback = useSelector(state => state.message)
  const dispatch = useDispatch()
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

  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    if (messageback) {
      showMessage();
    }
  }, [messageback]);

  const showMessage = () => {
    setMessageVisible(true);

    setTimeout(() => {
      setMessageVisible(false);
    }, 2000);
  };

  const fetchUserDetails = async () => {
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        const response = await axios.get('https://proyectofinal-production-4957.up.railway.app/user', {
          headers: {
            token: `${token}`,
          },
        });
        setUser(response?.data);
      } catch (error) {
        console.error('Error al obtener detalles del usuario:', error);
      }
    }
  };
  
  useEffect(() => {
    fetchUserDetails();
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
        const response = await axios.put(`https://proyectofinal-production-4957.up.railway.app/updateuser/${user.id}`, updatedUser);
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

  const deleteProduct = (productId) => {
    dispatch(deleteProducts(productId))
    fetchUserDetails()
   
  };

  return (
    <div className="flex h-screen container mx-auto py-4">
    <div className="w-1/4 bg-gray-200 p-10 flex flex-col justify-between rounded-[20px] shadow-xl">
      <ul className="space-y-24">
        <li
          className={`text-2xl font-semibold ${
            activeSection === 'informacion-personal' && 'text-blue-500'
          }`}
        >
          <Link
            to="#informacion-personal"
            onClick={() => setActiveSection('informacion-personal')}
          >
            Información Personal / Datos de Cuenta
          </Link>
        </li>
        <li
          className={`text-2xl font-semibold ${
            activeSection === 'productos-creados' && 'text-blue-500'
          }`}
        >
          <Link
            to="#productos-creados"
            onClick={() => setActiveSection('productos-creados')}
          >
            Productos Creados
          </Link>
        </li>
        <li
          className={`text-2xl font-semibold ${
            activeSection === 'actualizar-usuario' && 'text-blue-500'
          }`}
        >
          <Link
            to="#actualizar-usuario"
            onClick={() => setActiveSection('actualizar-usuario')}
          >
            Actualizar Usuario
          </Link>
        </li>
      </ul>
    </div>

    <div className="w-3/4">
      <div className="mb-4">
        <a
          href="/home"
          className="flex items-center text-blue-600 hover:underline text-2xl p-4"
        >
          <FaArrowLeft className="mr-2" /> Volver a Home
        </a>
      </div>

      {user ? (
          <div
            className="bg-gray-100 p-7 rounded mb-4 w-auto bg-white justify-between"
            id="informacion-personal"
          >
            {activeSection === 'informacion-personal' && (
              <>
                <h3 className="text-3xl font-semibold">Información Personal</h3>
                <div className="mt-5 space-y-9">
                  <div>
                    <label>
                      <strong>Name</strong>
                    </label>
                    <div className="w-auto bg-white p-4 flex items-center justify-between border-b rounded-[5px] shadow-xl">
                      <p>{user.name}</p>
                    </div>
                  </div>
                  <div>
                    <label>
                      <strong>Last Name</strong>
                    </label>
                    <div className="w-auto bg-white p-4 flex items-center justify-between border-b rounded-[5px] shadow-xl">
                      <p>{user.lastName}</p>
                    </div>
                  </div>
                  <div>
                    <label>
                      <strong>Birth Date</strong>
                    </label>
                    <div className="w-auto bg-white p-4 flex items-center justify-between border-b rounded-[5px] shadow-xl">
                      <p>{user.birthDate}</p>
                    </div>
                  </div>
                  <div>
                    <label>
                      <strong>Email</strong>
                    </label>
                    <div className="w-auto bg-white p-4 flex items-center justify-between border-b rounded-[5px] shadow-xl">
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div>
                    <label>
                      <strong>Username</strong>
                    </label>
                    <div className="w-auto bg-white p-4 flex items-center justify-between border-b rounded-[5px] shadow-xl">
                      <p>{user.userName}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
                  {messageVisible && (
            <div
              className="
                            text-2xl
                            font-bold
                            text-black-500
                            bg-blue-500
                            bg-opacity-75
                            rounded-lg
                            w-96
                            text-center
                            absolute
                            bottom-0
                            mb-8px
                            px-6
                            py-3
                            transition
                            duration-300
                            translate-y-[-30px]
                        "
            >
              {messageback}
            </div>
          )}

{user && user.CreatedProducts && user.CreatedProducts.length > 0 && (
        <div className="bg-white p-4 rounded mb-4" id="productos-creados">
          {activeSection === 'productos-creados' && (
            <>
              <h3 className="text-lg font-semibold mb-4">Productos Creados</h3>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {user.CreatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded p-4 border border-[#e7e9ec] flex flex-col"
                  >
                    <div className="flex items-center">
                      <div className="w-[50px] h-[50px] rounded-full">
                        <img src={user.profileImage} alt={user.profileImage} />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p className="text-lg font-semibold">{`$${product.price}`}</p>
                      </div>
                    </div>
                    <p className="text-sm mb-2">{product.description}</p>
                    <div className="flex overflow-x-auto">
                      {product.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Product Image ${index}`}
                          className="max-w-[150px] h-auto mr-2"
                        />
                      ))}
                    </div>
                    <button
                      className="mt-3 flex items-center text-red-500"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <FaTrash className="mr-1" />
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

{user && (
          <div className="bg-white p-7 rounded" id="actualizar-usuario">
            {activeSection === 'actualizar-usuario' && (
              <>
                <h3 className="text-3xl font-semibold mb-10">
                  Actualizar Información de Usuario
                </h3>
                <form onSubmit={onSubmit}>
                <div className="flex items-center justify-center">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                {profileImage ? (
                  <div>
                    <img
                      id="image-preview"
                      src={URL.createObjectURL(profileImage)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <label
                      htmlFor="profileImage"
                      className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-gray-500 absolute bottom-0 right-0 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </label>
                  </div>
                ) : (
                  <label
                    htmlFor="profileImage"
                    className="flex items-center justify-center w-full h-full cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </label>
                )}
              </div>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                className="hidden"
                onChange={(event) => setProfileImage(event.target.files[0])}
              />
            </div>

                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-lg font-semibold text-xl mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={onChange}
                      className="w-auto bg-white p-4 flex items-center justify-between border-b rounded-[5px] shadow-xl"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-lg font-semibold text-xl mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      className=" w-auto bg-white p-3 flex items-center justify-between border-b rounded-[5px] shadow-xl"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="userName"
                      className="block text-lg font-semibold text-xl mb-2"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      value={userName}
                      onChange={onChange}
                      className="w-auto bg-white p-3 flex items-center justify-between border-b rounded-[5px] shadow-xl"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="lastName"
                      className="block text-lg font-semibold text-xl mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={onChange}
                      className="w-auto bg-white p-3 flex items-center justify-between border-b rounded-[5px] shadow-xl"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="birthDate"
                      className="block text-lg font-semibold text-xl mb-2"
                    >
                      Birth Date
                    </label>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={birthDate}
                      onChange={onChange}
                      className="w-auto bg-white p-3 flex items-center justify-between border-b rounded-[5px] shadow-xl"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 text-xl shadow-xl"
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