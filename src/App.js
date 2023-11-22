
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './page/Home';
import About from './page/About';
import Cliente from './page/Cliente';
import Categorias from './page/Categorias';
import Producto from './page/Producto';
import Detalle from './page/Detalle';
import ClienteList from './page/ClienteList';
import CategoriasList from './page/CategoriasList';
import ProductoList from './page/ProductoList';
import PedidoList from './page/PedidoList';
import DetalleList from './page/DetalleList';
import Login from './page/Login';
import Galeria from './page/Galeria';
import Estadisticas from './page/Estadisticas';
import Pedido from './page/Pedido';
import SinAcceso from './page/SinAcceso';


function App() {

  const storedRol = localStorage.getItem('userRol');

  //const [userRol, setUserRol] = useState('');
  const [userRol, setUserRol] = useState(storedRol || '');

  // Guardar el rol del usuario en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('userRol', userRol);
  }, [userRol]);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login rol={userRol} setRol={setUserRol}  />} />
        <Route path="/home" element={userRol ? <Home rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/about" element={userRol ? <About rol={userRol} /> : <Navigate to="/sinacceso" />} />
        <Route path="/Cliente" element={userRol ? <Cliente rol={userRol} />  : <Navigate to="/sinacceso"/>} />
        <Route path="/Categorias" element={userRol ? <Categorias rol={userRol} />  : <Navigate to="/sinacceso"/>} />
        <Route path="/Producto" element={userRol ? <Producto rol={userRol} />  : <Navigate to="/sinacceso"/>} />
        <Route path="/Detalle" element={userRol ? <Detalle rol={userRol} />  : <Navigate to="/sinacceso"/>} />
        <Route path="/ClienteList" element={userRol ? <ClienteList rol={userRol} />  : <Navigate to="/sinacceso"/>} />
        <Route path="/CategoriasList" element={userRol ? <CategoriasList rol={userRol} />  : <Navigate to="/sinacceso"/>} />
        <Route path="/ProductoList" element={userRol ? <ProductoList rol={userRol} />  : <Navigate to="/sinacceso"/>} />
        <Route path="/galeria" element={userRol ? <Galeria rol={userRol} />  : <Navigate to="/sinacceso"/>} />
        <Route path="/PedidoList" element={userRol ? <PedidoList rol={userRol} />  : <Navigate to="/sinacceso"/>} />
        <Route path="/DetalleList" element={userRol ? <DetalleList rol={userRol} />  : <Navigate to="/sinacceso"/>} />
        <Route path="/estadisticas" element={userRol ? <Estadisticas rol={userRol} />  : <Navigate to="/sinacceso"/>} />
        <Route path="/Pedido" element={userRol ? <Pedido rol={userRol} />  : <Navigate to="/sinacceso"/>} />
        <Route path="/sinacceso" element={<SinAcceso />} />
      </Routes>
    </Router>
  );
}

export default App;

