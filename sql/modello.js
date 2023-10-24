const Sequelize = require('sequelize');
const sequelize = require('./seq.js');

const User = sequelize.define('Utenti', {
  nome: Sequelize.STRING,
  email: Sequelize.STRING,
  // Altri campi della tabella Utenti
});

module.exports = User;
