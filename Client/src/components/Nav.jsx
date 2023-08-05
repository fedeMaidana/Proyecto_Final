import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-3xl">
            Custom Craft
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/home"
                className="text-white text-2xl transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white rounded"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/social-shop"
                className="text-white text-2xl transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white rounded"
              >
                Social Shop
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
