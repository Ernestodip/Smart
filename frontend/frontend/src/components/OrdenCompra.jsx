// frontend/src/components/OrdenCompra.js

import React, { useState } from 'react';
import axios from 'axios';

const OrdenCompra = ({ carrito, datosContacto, datosEnvio }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.price * producto.cantidad, 0);
  };

  const handleConfirmarOrden = async () => {
    try {
      const ordenDeCompra = {
        userId: 123,
        totalPrice: calcularTotal(),
        shippingOption: 'Envío estándar',
        fechaOrden: new Date(), 
        estado: 'Pendiente', 
        metodoPago: 'Tarjeta de crédito', 
        direccionEnvio: datosEnvio.direccion, 
        direccionFacturacion: datosContacto.direccion,
        numeroSeguimiento: '', 
      };

      const response = await axios.post('/api/order', ordenDeCompra);
      console.log('Orden de compra guardada:', response.data);
    } catch (error) {
      console.error('Error al confirmar la orden de compra:', error);
    }
  };

  return (
    <div>
      <h2>Orden de Compra</h2>
      <button onClick={handleConfirmarOrden}>Confirmar Orden de Compra</button>
    </div>
  );
};

export default OrdenCompra;





