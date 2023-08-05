import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroPrecioMax, setFiltroPrecioMax] = useState('');
  const [filtroPrecioMin, setFiltroPrecioMin] = useState('');
  const [ordenamiento, setOrdenamiento] = useState('asc');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    fetchProductos();
  }, [filtroNombre, filtroPrecioMax, filtroPrecioMin, ordenamiento, filtroCategoria]);

  const fetchProductos = () => {
    const queryParams = {
      nombre: filtroNombre,
      precioMin: filtroPrecioMin,
      precioMax: filtroPrecioMax,
      orden: ordenamiento,
      categoria: filtroCategoria,
    };

    axios.get('/api/products', { params: queryParams })
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de productos:', error);
      });
  };

  const handleLimpiarFiltros = () => {
    setFiltroNombre('');
    setFiltroPrecioMax('');
    setFiltroPrecioMin('');
    setOrdenamiento('asc');
    setFiltroCategoria('');
  };

  const agregarAlCarrito = (producto) => {
    axios.post('/api/cart/add', { productId: producto.id, quantity: 1 })
      .then((response) => {
        setCarrito(response.data);
      })
      .catch((error) => {
        console.error('Error al agregar producto al carrito:', error);
      });
  };

  const numProductosSeleccionados = carrito.reduce((total, producto) => total + producto.quantity, 0);
  const precioTotal = carrito.reduce((total, producto) => total + (producto.price * producto.quantity), 0);

  return (
    <div>
      {/* Poner icono carrito */}
      <div>
        <i className="fa fa-shopping-cart"></i>
        <span>{numProductosSeleccionados}</span>
        <span>${precioTotal.toFixed(2)}</span>
      </div>

      <form>
        {productos.map((producto) => (
          <div key={producto.id}>
            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
            <button onClick={() => agregarAlCarrito(producto)}>Agregar al Carrito</button>
          </div>
        ))}
      </form>
      <input
        type="text"
        placeholder="Filtrar por nombre"
        value={filtroNombre}
        onChange={(e) => setFiltroNombre(e.target.value)}
      />
      <input
        type="number"
        placeholder="Filtrar por precio máximo"
        value={filtroPrecioMax}
        onChange={(e) => setFiltroPrecioMax(e.target.value)}
      />
      <input
        type="number"
        placeholder="Filtrar por precio mínimo"
        value={filtroPrecioMin}
        onChange={(e) => setFiltroPrecioMin(e.target.value)}
      />
      <button onClick={() => setOrdenamiento('asc')}>Ordenar Ascendente</button>
      <button onClick={() => setOrdenamiento('desc')}>Ordenar Descendente</button>

      <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
        <option value="">Seleccionar Categoría</option>
        <option value="Iluminacion">Iluminacion</option>
        <option value="AsistenteVirtual">Asistente virtual</option>
      </select>
      <button type="button" onClick={handleLimpiarFiltros}>
        Limpiar Filtros
      </button>
    </div>
  );
};

export default ListaProductos;





