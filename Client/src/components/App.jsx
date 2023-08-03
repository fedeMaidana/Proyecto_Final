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
      <Nav />
      <Routes>
        {/* La ruta principal ahora renderizará el componente Intro */}
        <Route path="/" element={<Intro />} />

        {/* La ruta /home también renderiza el componente Home */}
        <Route path="/home" element={<Home />} />

        {/* La ruta /intro renderiza el componente Intro */}
        <Route path="/intro" element={<Intro />} />

        {/* La ruta /community renderiza el componente Community */}
        <Route path="/community" element={<Community />} />

        {/* La ruta /customize renderiza el componente Customize */}
        <Route path="/customize" element={<Customize />} />
      </Routes>
    </div>
  );
}

export default App;
