import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/images/DiseñoBase_de_logoCustomCraft_black.png'
import { Cart } from './Cart'
import Cookies from 'universal-cookie';

export function Nav() {
  const [ user, setUser ] = useState( undefined )
  const [ isModalOpen, setIsModalOpen ] = useState( false )
  const cookies = new Cookies();
  useEffect(() => {
    const token = localStorage.getItem( 'token' )
    const googleToken = cookies.get('googleToken');
    console.log('Google Token:', googleToken);

    console.log('Local Token:', token);
    console.log('Google Token inside useEffect:', googleToken);
    
    

    if( token ){
      const fetchUserDetails = async () => {
        try{
          const response = await axios.get( 'http://localhost:3001/user', {
            headers: {
              token: `${ token }`
              
            }
          })

          setUser( response?.data?.name )

        }catch( error ){
          console.error( 'Error al obtener detalles del usuario:', error )
        }
      }

      fetchUserDetails()
    }

    if (googleToken) {
      // Haz una petición para obtener los detalles del usuario usando el token de Google
      const fetchGoogleUserDetails = async () => {
        try {
          const responseGoogle = await axios.get('http://localhost:3001/user/google', {
            headers: {
              googleToken: googleToken,
            },
          });
          const { name } = responseGoogle.data;

          // Luego, puedes actualizar el estado o la variable 'user' con el nombre del usuario
          setUser(name);
        } catch (error) {
          console.error('Error al obtener detalles del usuario de Google:', error);
        }
      };

      fetchGoogleUserDetails();
    }
  }, [] )
  

  const handleLogout = () => {
    localStorage.removeItem( 'token' )
    setUser( undefined )
    setIsModalOpen( false )
  }
  

  return (
    <nav className="w-full h-[10vh] fixed flex justify-between items-center p-3 bg-white/[.3] backdrop-blur-sm border-b-[1px] z-50">
      <Link to="/">
        <img src={ logo } alt="Custom Craft Logo" className="w-[10rem] cursor-pointer" />
      </Link>

      <div className='flex w-[45%] justify-between'>
        <ul className="w-[300px] flex items-center justify-evenly border-r-[1px] border-[#858585]">
          <li>
            <Link
              to="/home"
              className="text-principal-black text-[1.5rem] transition duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-300 rounded"
            >
              <p className='font-semibold'>Inicio</p>
            </Link>
          </li>
          <li>
            <Link
              to="/community"
              className="text-principal-black text-[1.5rem] transition duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-300 rounded"
            >
              <p className='font-semibold'>Comunidad</p>
            </Link>
          </li>
        </ul>

        { user !== undefined
          ?(
            <ul className='w-[55%] flex justify-around items-center'>
              <Cart />
              <li className="relative flex items-center gap-[10px] cursor-pointer" onClick={ () => setIsModalOpen( prevState => !prevState ) } >
                <p className='text-[1.5rem]' >{ user }</p>
                <span className='w-[40px] h-[40px] flex bg-black rounded-full'></span>

                {isModalOpen && (
                <div className="w-[200%] flex flex-col items-baseline absolute top-[47px] right-[-36px] bg-secondary-blue2 p-4 z-50 rounded-bl-[10px] rounded-br-[10px]">
                  <Link to="/my-profile" className="text-[1.5rem] cursor-pointer">
                    Mi Perfil
                  </Link>
                  <button className="text-[#b30000] text-[1.5rem] cursor-pointer" onClick={ handleLogout } >
                    Cerrar Sesión
                  </button>
                </div>
              )}

              </li>
            </ul>
          ):(
            <div className='w-[55%] flex items-center justify-center'>
              <Link to='login'>
                <button className='py-2 px-4 bg-[#33a1fd] text-white text-[1.2rem] font-semibold rounded-full'>Iniciar Sesión</button>
              </Link>
            </div>
          )}
      </div>
    </nav>
  )
}
