const Sequelize = require('sequelize');

const sequelize = new Sequelize('tac', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', 
});

module.exports = sequelize;