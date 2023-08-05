const { Order } = require('../models');

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      totalPrice,
      shippingOption,
      fechaOrden,
      estado,
      metodoPago,
      direccionEnvio,
      direccionFacturacion,
      numeroSeguimiento,
    } = req.body;

    const order = await Order.create({
      userId,
      totalPrice,
      shippingOption,
      fechaOrden,
      estado,
      metodoPago,
      direccionEnvio,
      direccionFacturacion,
      numeroSeguimiento,
    });
    return res.status(201).json(order);
  } catch (error) {
    console.error('Error al crear la orden:', error);
    return res.status(500).json({ error: 'Error al crear la orden' });
  }
};

module.exports = {
  createOrder,
};

