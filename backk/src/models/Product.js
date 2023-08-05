const { DataTypes } = require('sequelize');
const sequelize = require('../db');


const Product = sequelize.define('Product', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Product;
