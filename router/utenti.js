const express = require('express');
const router = express.Router('../index.js');
const bodyParser = require('body-parser');
const { dir } = require('console');
const { dirname } = require('path');
const sequelize = require('../sql/seq.js');
const User = require('../sql/modello.js');
const Sequelize = require('sequelize');

var cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
  optionSuccessStatus: 200
}

router.use(cors(corsOptions))

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://localhost:4200");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});
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
          res.send('Utente inserito correttamente');
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
      res.status(500).send('Internal Server Error', 'errore:', error);
      // Chiudi la connessione al database quando hai finito
    });
});

module.exports = router;