import { Route, Routes, useLocation} from 'react-router-dom'
import Intro from '../views/Intro'
import Home from '../views/Home'
import Login from '../views/Login'
import { Customize } from '../views/Customize.jsx'
import './App.css'

export function App() {
  const location = useLocation()

  return (
    <>
      <div>
        <div>
          { location.pathname !== '/' && location.pathname !== '/home' ? <Nav/> : null }

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
