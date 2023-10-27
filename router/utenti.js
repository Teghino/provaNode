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
    .then((utente) => {
      if (utente == null) {
        res.sendFile('accessofallito.html', { root: __dirname + '/../public' });
      } else {
        console.log(utente);
        res.status(200).send('Accesso effettuato correttamente');
      }
      // Chiudi la connessione al database quando hai finito
    })
    .catch((error) => {
      console.error('Errore:', error);
      res.status(500).send('Internal Server Error');
      // Chiudi la connessione al database quando hai finito
    });
});

module.exports = router;