
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import About from './page/About';
import Cliente from './page/Cliente';
import Categorias from './page/Categorias';
import Producto from './page/Producto';
import Pedido from './page/Pedido';
import Detalle from './page/Detalle';
import ClienteList from './page/ClienteList';
import CategoriasList from './page/CategoriasList';
import ProductoList from './page/ProductoList';
import PedidoList from './page/PedidoList';
import DetalleList from './page/DetalleList';
import Login from './page/Login';


function App() {

  const [userRol, setUserRol] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login rol={userRol} setRol={setUserRol} />} />
        <Route path="/home" element={<Home rol={userRol} />} />
        <Route path="/about" element={<About rol={userRol} />} />
        <Route path="/Cliente" element={<Cliente rol={userRol} />} />
        <Route path="/Categorias" element={<Categorias rol={userRol} />} />
        <Route path="/Producto" element={<Producto rol={userRol} />} />
        <Route path="/Pedido" element={<Pedido rol={userRol} />} />
        <Route path="/Detalle" element={<Detalle rol={userRol} />} />
        <Route path="/ClienteList" element={<ClienteList rol={userRol} />} />
        <Route path="/CategoriasList" element={<CategoriasList rol={userRol} />} />
        <Route path="/ProductoList" element={<ProductoList rol={userRol} />} />
        <Route path="/PedidoList" element={<PedidoList rol={userRol} />} />
        <Route path="/DetalleList" element={<DetalleList rol={userRol} />} />
      </Routes>
    </Router>
  );
}

export default App;

