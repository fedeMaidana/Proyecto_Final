import { Link } from 'react-router-dom'
import logo from '../assets/images/DiseñoBase_de_logoCustomCraft_black.png'

export function Nav() {
  return (
    <nav className="bg-secondary-blue2 p-4">
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
                <p  className='font-bold'>Comunity</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}