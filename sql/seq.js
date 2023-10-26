const Sequelize = require('sequelize');

const sequelize = new Sequelize('tac', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', 
  port: 3306, // Porta predefinita di MySQL
  tabelname: 'account',
  define: {
    timestamps: false, // Opzionale: disabilita la generazione automatica dei timestamp
    autoIncrement: false, // Disabilita l'auto incremento per l'attributo id
  },
});

module.exports = sequelize;