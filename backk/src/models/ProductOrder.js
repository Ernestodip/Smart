const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Product = require('./Product');

const ProductOrder = sequelize.define('ProductOrder', {
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = ProductOrder;


