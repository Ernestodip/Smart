const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Product = require('./Product');
const ProductOrder = require('./ProductOrder');

const Order = sequelize.define('Order', {
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  shippingOption: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fechaOrden: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  metodoPago: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccionEnvio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccionFacturacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numeroSeguimiento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Relación uno a muchos entre User y Order
Order.belongsTo(User, { foreignKey: 'userId' });

// Relación muchos a muchos entre Product y Order mediante una tabla intermedia ProductOrder
Product.belongsToMany(Order, { through: ProductOrder });
Order.belongsToMany(Product, { through: ProductOrder });

module.exports = Order;




