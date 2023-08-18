import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/images/DiseñoBase_de_logoCustomCraft_black.png'
import { Cart } from './Cart'
import { IconProfileArrow } from '../assets/icons/icons'

export function Nav() {
  const [ user, setUser ] = useState( undefined )
  const [ isModalOpen, setIsModalOpen ] = useState( false )

  useEffect(() => {
    const token = localStorage.getItem( 'token' )

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
  }, [] )

  const handleLogout = () => {
    localStorage.removeItem( 'token' )
    setUser( undefined )
    setIsModalOpen( false )
  }

  return (
    <>
      <nav className="w-full h-[10vh] fixed flex justify-between items-center p-3 bg-white/[.3] backdrop-blur-[5px] border-b-[1px] z-50">
        <Link to="/">
          <img src={ logo } alt="Custom Craft Logo" className="select-none w-[100px] cursor-pointer" />
        </Link>

        <div className='flex w-auto justify-between'>
          <ul className="w-[150px] md:w-[200px] lg:w-[200px] flex items-center justify-evenly border-r-[1px] border-[#858585]">
            <li>
              <Link
                to="/home"
                className="text-principal-black text-[1.5rem] transition duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-300 rounded"
              >
                <p className='select-none font-semibold'>Inicio</p>
              </Link>
            </li>
            <li>
              <Link
                to="/community"
                className="text-principal-black text-[1.5rem] transition duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-300 rounded"
              >
                <p className='select-none font-semibold'>Comunidad</p>
              </Link>
            </li>
          </ul>

          { user !== undefined
            ?(
              <ul className='w-[110px] md:w-[150px] lg:w-[150px] flex justify-around items-center'>
                <Cart />
                <li className="relative flex items-center gap-[10px] cursor-pointer" onClick={ () => setIsModalOpen( prevState => !prevState ) } >
                  <span className='select-none w-[40px] h-[40px] flex bg-[#555555] rounded-full'></span>
                  <IconProfileArrow className={ `transform ${isModalOpen === false ? 'rotate-[270deg]' : 'rotate-90'}` } />
                </li>
              </ul>
            ):(
              <div className='w-[55%] flex items-center justify-center'>
                <Link to='login'>
                  <button className='select-none py-2 px-4 bg-[#33a1fd] text-white text-[1.2rem] font-semibold rounded-full'>Iniciar Sesión</button>
                </Link>
              </div>
            )}
        </div>
      </nav>

      {isModalOpen && (
        <div className="w-[200px] z-10 flex flex-col items-baseline fixed top-[68px] right-[0] bg-white/[.3] backdrop-blur-[5px] border-l-[1px] border-b-[1px] border-r-[1px] rounded-bl-[10px] rounded-br-[10px]">
          <div className='w-full p-5 border-b-[1px]'>
            <p className='select-none text-[1.6rem] font-semibold'>Hola { user }</p>
            <Link to="/my-profile" className="select-none text-[1.5rem] cursor-pointer">Ver mi Perfil</Link>
          </div>
          <button className="select-none p-5 text-[#ff0000] text-[1.5rem] font-semibold cursor-pointer" onClick={ handleLogout } >
            Cerrar sesión
          </button>
        </div>
      )}
    </>
  )
}
