import { Link } from 'react-router-dom'
import logo from '../assets/images/DiseñoBase_de_logoCustomCraft_black.png'
// import { Cart } from './Cart'

export function Nav() {
  return (
    <nav className="bg-secondary-blue2 p-4 relative">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img
              src={logo}
              alt="Custom Craft Logo"
              className="w-[11rem] cursor-pointer"
            />
          </Link>
          <ul className="flex space-x-20">
            <li>
              <Link
                to="/home"
                className="text-principal-black text-3xl transition duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-300 rounded"
              >
                <p className='font-bold'>Home</p>
              </Link>
            </li>
            <li>
              <Link
                to="/community"
                className="text-principal-black text-3xl transition duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-300 rounded"
              >
                <p className='font-bold'>Community</p>
              </Link>
            </li>

            <li className="relative group z-50">
              <label className='text-principal-black text-3xl font-bold cursor-pointer group-hover:bg-blue-600 group-hover:text-gray-300 rounded'>
                nombre del usuario
                <ul className="menu-vertical absolute left-0 hidden mt-1 space-y-2 group-hover:block z-60 bg-secondary-blue2 p-4"> {/* Cambiamos el color de fondo y agregamos un relleno interno */}
                  <li>
                    <Link
                      to="/my-profile"
                      className="text-principal-black text-3xl cursor-pointer"
                    >
                      Mi Perfil
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/other-link"
                      className="text-principal-black text-3xl cursor-pointer"
                    >
                      Otro Enlace
                    </Link>
                  </li>
                </ul>
              </label>
            </li>

          </ul>
          {/* <Cart /> */}
        </div>
      </div>
    </nav>
  );
}
