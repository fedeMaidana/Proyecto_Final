import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/images/DiseñoBase_de_logoCustomCraft_black.png'
import { Cart } from './Cart'
import { IconProfileArrow, IconShoppingCart } from '../assets/icons/icons'


export function Nav() {
  const cartCount = useSelector( state => state.cartCount )

  const googleToken = localStorage.getItem( 'googleToken')
  const token = localStorage.getItem( 'token' )

  const [ user, setUser ] = useState( undefined )
  const [ userImage, setUserImage ] = useState( undefined )
  const [ userRol, setUserRol ] = useState( undefined )
  const [ ModalProfile, setModalProfile ] = useState( false )
  const [ ModalCart, setModalCart ] = useState( false )
  const [ userId, setUserId ] = useState( null )

  useEffect(() => {
    setModalProfile( false )
  }, [])

  useEffect(() => {

    if( token ){
      const fetchUserDetails = async () => {
        try{
          const response = await axios.get( 'https://proyectofinal-production-4957.up.railway.app/user', {
            headers: {
              token: `${ token }`
            }
          })

          const userId = response?.data.id;
          setUserId( userId )
          localStorage.setItem( 'userId', userId )

          setUser( response?.data?.name )
          setUserImage( response?.data?.profileImage )
          setUserRol( response?.data?.role )

        }catch( error ){
          console.error( 'Error al obtener detalles del usuario:', error )
        }
      }

      fetchUserDetails()
    }
    if( googleToken ){
      const fetchGoogleUserDetails = async () => {
        try {
          const responseGoogle = await axios.get('https://proyectofinal-production-4957.up.railway.app/user/google', {
            headers: {
              googleToken: googleToken,
            }
          })

          const { name, id } = responseGoogle.data

          setUserId( id )
          localStorage.setItem( 'userId', id )
          setUser( responseGoogle?.data?.name )
          setUserImage( responseGoogle?.data?.profileImage )
          setUserRol( responseGoogle?.data?.role )

          setUser( name )
        }catch( error ){
          console.error('Error al obtener detalles del usuario de Google:', error);
        }
      }

      fetchGoogleUserDetails()
    }
  }, [])

  const handleCartClick = () => {
    setModalCart( prevState => !prevState )
    setModalProfile( false )
  }

  const handleProfileClick = () => {
    setModalProfile( prevState => !prevState )
    setModalCart( false )
  }

  const handleLogout = () => {
    localStorage.removeItem( 'token' )
    localStorage.removeItem( 'role' )
    setUser( undefined )
    setModalProfile( false )
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
                <div className='cursor-pointer' onClick={ handleCartClick }>
                  <IconShoppingCart/>

                  <div className='absolute top-[42px] right-[83px] md:top-[35px] md:right-[113px] lg:top-[35px] lg:right-[113px] bg-black text-white w-6 h-6 flex justify-center items-center rounded-full'>
                    <span className='text-xs select-none' id='contador-productos'>{ cartCount }</span>
                  </div>
                </div>
                <li className="relative flex items-center gap-[10px] cursor-pointer" onClick={ handleProfileClick } >
                  <img src={ userImage } className='select-none w-[40px] h-[40px] flex bg-[#555555] rounded-full'></img>
                  <IconProfileArrow className={ `transform ${ModalProfile === false ? 'rotate-[270deg]' : 'rotate-90'}` } size={ '10' } />
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

      {ModalCart && (
        <Cart />
      )}

      {ModalProfile && (
        <div className="w-[200px] z-10 flex flex-col items-baseline fixed top-[68px] right-[0] bg-white/[.3] backdrop-blur-[5px] border-l-[1px] border-b-[1px] border-r-[1px] rounded-bl-[10px] rounded-br-[10px]">
          <div className='w-full p-5 border-b-[1px] flex flex-col'>
            <p className='select-none text-[1.6rem] font-semibold'>Hola { user }</p>
            <Link to="/my-profile" className="select-none text-[1.5rem] cursor-pointer" onClick={ () => setModalProfile( false ) } >Ver mi Perfil</Link>
            { userRol === 'admin' ? ( <Link to="/dashboard" className="select-none text-[1.5rem] cursor-pointer" onClick={ () => setModalProfile( false ) } >Ver perfil de admin</Link> ) : '' }
          </div>
          <button className="select-none p-5 text-[#ff0000] text-[1.5rem] font-semibold cursor-pointer" onClick={ handleLogout } >
            Cerrar sesión
          </button>
        </div>
      )}
    </>
  )
}