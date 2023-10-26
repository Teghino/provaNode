const express = require('express');
const router = express.Router('../index.js');
const fs = require('fs');
const bodyParser = require('body-parser');
const { dir } = require('console');
const { dirname } = require('path');
const sequelize = require('../sql/seq.js');
const User = require('../sql/modello.js');
const Sequelize = require('sequelize');
const { exit } = require('process');


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
  
router.post('/register',  (req, res) => {
    const dati = req.body;
      User.create({
        email: dati.username,
        psw: dati.password,
      })
        .then((user) => {
          res.send('Utente inserito correttamente')
          return;
        })
        .catch((error) => {
          console.error('Errore durante l\'inserimento dell\'utente:', error);
          res.sendFile('registrazionefallita.html', {root : __dirname + '/../public'});
          return;
        });
    // Chiudi la connessione al database quando hai finito
});

router.post('/login', (req, res) => {
  const dati = req.body;
  User.findOne({
    where: {
      email: dati.username,
      psw: dati.password,
    },
    
  })
    .then((users) => {
      console.log('Elenco di utenti:', users);
    }).catch((error) => {
      console.error('Errore:', error);
    });
      // Chiudi la connessione al database quando hai finito
});


// Esempio: seleziona tutti gli utenti dalla tabella Utenti

  

  

module.exports = router;