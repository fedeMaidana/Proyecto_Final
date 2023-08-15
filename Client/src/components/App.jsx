import { Route, Routes, useLocation } from 'react-router-dom'
import { Intro } from '../views/Intro'
import { Home } from '../views/Home'
import { Login } from '../views/Login'
import { Nav } from '../components/Nav.jsx'
import { Customize } from '../views/Customize.jsx'
import { Register } from '../views/Register.jsx'
import { Community } from '../views/Community'
import {ProfilePage} from '../views/Perfil'

import axios from "axios"
axios.defaults.baseURL = 'http://localhost:3001/'

export function App() {
  const location = useLocation()

  const shouldShowNavBar = [ '/home', '/Community' ].some( path => location.pathname.startsWith( path ) )


  return (
    <>
    { shouldShowNavBar && <Nav /> }

      <Routes>
        <Route path='/' element={ <Intro/> } />
        <Route path='/home' element={ <Home/> } />
        <Route path='/customize/:model' element={ <Customize/> } />
        <Route path='/login' element={ <Login/> } />
        <Route path='/register' element={ <Register/> } />
        <Route path="/community" element={<Community />} />
        <Route path='/my-profile' element={<ProfilePage />} />
      </Routes>
    </>
  )
}
