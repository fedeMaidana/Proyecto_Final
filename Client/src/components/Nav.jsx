import { Link } from 'react-router-dom'

export function Nav() {
  return (
    <nav className="bg-blue-400 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img
              src="/assets/DiseñoBase_de_logoCustomCraft_white.png"
              alt="Custom Craft Logo"
              className="w-24 h-24 cursor-pointer"
            />
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/home"
                className="text-gray-300 text-3xl transition duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-300 rounded"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/social-shop"
                className="text-gray-300 text-3xl transition duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-300 rounded"
              >
                Comunidad
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
