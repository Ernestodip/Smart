const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class CartItem extends Model {}

CartItem.init({
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'CartItem',
});

module.exports = CartItem;
