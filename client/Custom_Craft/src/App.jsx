import { useState } from 'react'
import { Route, Routes, useLocation} from 'react-router-dom'
import Intro from '../components/Intro'
import Home from '../components/Home'
import Customize from '../components/Customize'
import Login from '../components/Login'
/* import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import './App.css'

function App() {
  const location = useLocation()

  return (
    <>
      <div>
        <div> 
        { location.pathname !== '/' && location.pathname !== '/home' ? <Nav/>: null } {/* Si la ruta actual no es '/' ni '/home', se muestra el componente Nav. */}
        <Routes>
          <Route path='/' element={<Intro/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/detail/:id' element={<Customize/>}/>
          <Route path='/form' element={<Login/>}/>
        </Routes>

        </div>

      </div>
    </>
  )
}

export default App
