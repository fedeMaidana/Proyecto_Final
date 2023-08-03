import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './Nav';
import Home from '../views/Home';
import Intro from '../views/Intro';
import Community from '../views/Community';
import Customize from '../views/Customize';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* La ruta principal ahora renderizará el componente Intro */}
        <Route path="/" element={<Intro />} />

        {/* La ruta /home también renderiza el componente Nav */}
        <Route path="/home" element={<Nav />}>
          <Route index element={<Home />} />
        </Route>

        {/* La ruta /community también renderiza el componente Nav */}
        <Route path="/community" element={<Nav />}>
          <Route index element={<Community />} />
        </Route>

        {/* La ruta /customize renderiza el componente Customize */}
        <Route path="/customize" element={<Customize />} />
      </Routes>
    </div>
  );
}

export default App;


      
 