import { Route, Routes, useLocation } from 'react-router-dom'
import { Intro } from '../views/Intro'
import { Home } from '../views/Home'
import { Login } from '../views/Login'
import { Nav } from '../components/Nav.jsx'
import { Customize } from '../views/Customize.jsx'

export function App() {
  const location = useLocation()

  return (
    <>
      { location.pathname !== '/' && location.pathname !== '/home' ? <Nav/> : null }

      <Routes>
        <Route path='/' element={ <Intro/> } />
        <Route path='/home' element={ <Home/> } />
        <Route path='/customize' element={ <Customize/> } />
        <Route path='/form' element={ <Login/> } />
      </Routes>
    </>
  )
}
