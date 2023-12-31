import { Route, Routes, useLocation } from 'react-router-dom'
import { Intro } from '../views/Intro'
import { Home } from '../views/Home'
import { Login } from '../views/Login'
import { Nav } from '../components/Nav.jsx'
import { Customize } from '../views/Customize.jsx'
import { Register } from '../views/Register.jsx'
import { Community } from '../views/Community'
import { ProfilePage } from '../views/Perfil'
import { Dashboard } from '../views/Dashboard'
import PaymentCancel from '../views/PaymentCancel'
import PaymentSuccess from '../views/PaymentSuccess'
import axios from "axios"


axios.defaults.baseURL = 'https://proyectofinal-production-4957.up.railway.app'
//axios.defaults.baseURL = 'https://localhost:3001'

export function App() {
  const location = useLocation()

  const shouldShowNavBar = [ '/home', '/community', '/dashboard', '/my-profile' ].some( path => location.pathname.startsWith( path ) )

  const isLoggedIn = localStorage.getItem('token') !== null || localStorage.getItem('googleToken') !== null;
  const userRole = localStorage.getItem('role');


  return(

    <>
      { shouldShowNavBar && <Nav /> }
      <Routes>

        <Route path='/' element={<Intro />} />
        <Route path='/home' element={<Home />} />
        <Route path='/customize/:model' element={<Customize />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/community" element={<Community />} />
        <Route path="/cancel" element={<PaymentCancel/>} />
        <Route path="/success" element={<PaymentSuccess/>} />
        <Route path="/my-profile" element={<ProfilePage />} />


        {
        isLoggedIn && userRole === 'admin' ? (

          <Route path="/dashboard" element={<Dashboard />} />
          
        ): null}


      </Routes>
    </>
  )
}