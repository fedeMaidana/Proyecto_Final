import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
function Nav() {
  return (
     <div>
          <Link to="/home">Home</Link>
          <Link to="/community">Community</Link>
          <Outlet></Outlet>
      </div>
  );
}

export default Nav;
