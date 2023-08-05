import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import ListaProductos from './components/ListaProductos';
import CarritoCompras from './components/CarritoCompra';
import OrdenCompra from './components/OrdenCompra';
import Registro from './components/Registro';
import Login from './components/Login';

axios.defaults.baseURL = 'http://localhost:3001/';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListaProductos />} />
        <Route path="/carrito" element={<CarritoCompras />} />
        <Route path="/orden-compra" element={<OrdenCompra />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/Login" element={<Login />} />

        
      </Routes>
    </Router>
  );
}

export default App;








