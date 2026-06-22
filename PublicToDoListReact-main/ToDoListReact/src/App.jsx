import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Registro from './componentes/Registro'
import Login from './componentes/Login'
import ListaTareas from './componentes/ListaTareas'
import { get } from './services/peticiones'
import { Outlet } from 'react-router'
import BarraNavegacionLogin from './componentes/BarraNavegacionLogin'
import BarraNavegacionNOLogin from './componentes/BarraNavegacionNOLogin'

function App() {
  const [logedIn, setLogedIn] = useState(JSON.parse(sessionStorage.getItem("logedIn")||"{}"));


  return (
    <>
      {logedIn.token ? <BarraNavegacionLogin/> : <BarraNavegacionNOLogin/>}
      <Outlet context={[logedIn,setLogedIn]}/>
    </>
  )
}

export default App
