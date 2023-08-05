import { Route, Routes, useLocation } from 'react-router-dom'
import { Intro } from '../views/Intro'
import { Home } from '../views/Home'
import { Login } from '../views/Login'
import { Customize } from '../views/Customize.jsx'
import  Nav  from '../components/Nav'
import { Community } from '../views/Community'

export function App() {
  const location = useLocation()
  const shouldShowNavBar = ['/home', '/social-shop'].some(path => location.pathname.startsWith(path));
  return (
    <>
    {shouldShowNavBar && <Nav />}
      <Routes>
        <Route path='/' element={ <Intro/> } />
        <Route path='/home' element={ <Home/> } />
        <Route path='/customize' element={ <Customize/> } />
        <Route path='/form' element={ <Login/> } />
        <Route path="/social-shop" element={<Community />} />
      </Routes>
    </>
  )
}
