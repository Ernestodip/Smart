import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CarritoCompras = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        const productosDesdeBD = response.data;
        setCarrito(productosDesdeBD);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de productos: ', error);
      });
  }, []);

  const eliminarDelCarrito = (idProducto) => {
    axios.post('/api/cart/remove', { productId: idProducto })
      .then((response) => {
        setCarrito(response.data);
      })
      .catch((error) => {
        console.error('Error al eliminar producto del carrito:', error);
      });
  };

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.price * producto.cantidad, 0);
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          {carrito.map((producto) => (
            <div key={producto.id}>
              <h3>{producto.name}</h3>
              <p>Cantidad: {producto.cantidad}</p>
              <p>Precio unitario: ${producto.price}</p>
              <p>Subtotal: ${producto.price * producto.cantidad}</p>
              <button onClick={() => eliminarDelCarrito(producto.id)}>Eliminar del Carrito</button>
            </div>
          ))}
          <p>Total: ${calcularTotal()}</p>
          <Link to="/orden-compra">
            <button>Confirmar Orden de Compra</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CarritoCompras;





