import { Outlet } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav/Nav'
import Home from './views/Home/Home'

function App() {

  return (
    <>
      <Outlet/>
      <Nav/>
    </>
  )
}

export default App
