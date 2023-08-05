
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('smart', 'root', 'Mermila2', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

module.exports = sequelize;