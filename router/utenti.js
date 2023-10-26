const express = require('express');
const router = express.Router('../index.js');
const fs = require('fs');
const bodyParser = require('body-parser');
const { dir } = require('console');
const { dirname } = require('path');
const sequelize = require('../sql/seq.js');
const User = require('../sql/modello.js');
const Sequelize = require('sequelize');


//router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'));

router.post('/login', (req, res) => {
    const dati = req.body;
    User.findAll().then((users) => {
        console.log('Elenco di utenti:', users);
      }).catch((error) => {
        console.error('Errore:', error);
      });
        // Chiudi la connessione al database quando hai finito
});
  
router.post('/register', (req, res) => {
    const dati = req.body;
      User.create({
        email: 'Nome Utente',
        psw: 'email@esempio.com'
      })
        .catch((error) => {
          console.error('Errore durante l\'inserimento dell\'utente:', error);
        });
          // Chiudi la connessione al database quando hai finito
    res.sendFile(__dirname + "../public/")
});

// Esempio: seleziona tutti gli utenti dalla tabella Utenti

  

  

module.exports = router;