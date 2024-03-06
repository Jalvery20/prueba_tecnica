import React from 'react'
import './globals.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/pages/Auth/Login"
import Home from "./components/pages/Home/Home"
import ErrorPage from "./components/pages/ErrorPage/ErrorPage"


import Registro from "./components/pages/Auth/Registro"
import { AuthProvider } from './store/store';
import ConsultaCliente from './components/pages/ConsultaCliente/ConsultaCliente';
import MantenimientoCliente from './components/pages/Mantenimiento/MantenimientoCliente';
const App = () => {
  
  
  return (
    <AuthProvider>
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/consulta" element={<ConsultaCliente />} />
            <Route path="/mantenimiento" element={<MantenimientoCliente />} />
            <Route path="/mantenimiento/:clientId" element={<MantenimientoCliente />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
