import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Registro from './componentes/Registro.jsx'
import Login from './componentes/Login.jsx'
import ListaTareas from './componentes/ListaTareas.jsx'
import Bienvenida from './componentes/Bienvenida.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route path='homenologin' element={<Bienvenida/>}/>
        <Route path='homelogin' element={<Bienvenida/>}/>
        <Route path="registro" element={<Registro/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path='tareas' element={<ListaTareas/>}/>
      </Route>
    
    </Routes>
  </BrowserRouter>
)
