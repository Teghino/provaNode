const express = require('express');
const router = express.Router('../index.js');
const bodyParser = require('body-parser');
const { dir } = require('console');
const { dirname } = require('path');
const sequelize = require('../sql/seq.js');
const User = require('../sql/modello.js');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');


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
router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }));

router.use(express.static('public'));

  
router.post('/register',  (req, res) => {
  console.log(process.env.JWT_SECRET);
  console.log(req.body);
    const dati = req.body;
      User.create({
        nome: dati.nome,
        email: dati.username,
        psw: dati.password,
      })
        .then((user) => {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.status(200).json({ message: 'Registrazione avvenuta con successo', token: token });
          return;
        })
        .catch((error) => {
          if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Email già registrata.' });
          }
          console.error('Errore durante l\'inserimento dell\'utente:', error);
          return res.status(500).json({ error: 'Si è verificato un errore durante la registrazione.' });
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
        res.status(200).json({ exists: false, message: 'L\'utente non esiste.' });
      } else {
        console.log(utente);
        const token = jwt.sign({ id: utente.id }, process.env.JWT_SECRET, {
          expiresIn: 86400 // scade in 24 ore
        });
        res.status(200).json({ exists: true, message: 'L\'utente esiste.', token: token });
      }
      // Chiudi la connessione al database quando hai finito
    })
    .catch((error) => {
      console.error('Errore durante il login:', error);
      res.status(500).send('Internal Server Error', 'errore:', error);
      // Chiudi la connessione al database quando hai finito
    });
});

router.get('/checkUser/:username', (req, res) => {
  const requestedUsername = req.params.username; // Ottieni il nome utente dalla richiesta

  // Esegui la logica per controllare se l'utente esiste nel database
  User.findOne({
    where: {
      email: requestedUsername,
    },
  })
    .then((utente) => {
      if (utente == null) {
        res.status(200).json({ exists: false, message: 'L\'utente non esiste.' });
      } else {
        res.status(200).json({ exists: true, message: 'L\'utente esiste.' });
      }
      // Chiudi la connessione al database quando hai finito
    })
    .catch((error) => {
      res.status(500).send('Internal Server Error', 'errore:', error);
      // Chiudi la connessione al database quando hai finito
    });
  });

  router.get('/protected', verificaToken, (req, res) => {
    // se il token è valido, req.userId conterrà l'id dell'utente
    res.status(200).send({ message: 'Protected route accessed!', userId: req.userId });
  });

  function verificaToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        // se tutto va bene, salva la richiesta per l'uso in altre rotte
        req.userId = decoded.id;
        next();
    });
}

module.exports = router;