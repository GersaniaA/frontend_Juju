
import React from 'react';
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


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Cliente" element={<Cliente />} />
        <Route path="/Categorias" element={<Categorias />} />
        <Route path="/Producto" element={<Producto />} />
        <Route path="/Pedido" element={<Pedido />} />
        <Route path="/Detalle" element={<Detalle />} />
        <Route path="/ClienteList" element={<ClienteList />} />
        <Route path="/CategoriasList" element={<CategoriasList />} />
        <Route path="/ProductoList" element={<ProductoList />} />
        <Route path="/PedidoList" element={<PedidoList />} />
        <Route path="/DetalleList" element={<DetalleList />} />
      </Routes>
    </Router>
  );
}

export default App;

