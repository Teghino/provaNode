const Sequelize = require('sequelize');
const sequelize = require('./seq.js');

const User = sequelize.define('account', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  psw: Sequelize.STRING,
  id: false,
  // Altri campi della tabella Utenti
});

module.exports = User;
