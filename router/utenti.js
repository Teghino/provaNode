const express = require('express');
const router = express.Router('../index.js');
const fs = require('fs');
const bodyParser = require('body-parser');

//router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'));

router.post('/login', (req, res) => {
    const dati = req.body;
    fs.readFile('./dati.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Errore durante la lettura del file JSON:', err);
        return;
      }
      const datiEsistenti = JSON.parse(data);
        if(datiEsistenti.find((d) => dati.username === d.username && dati.password === d.password)){
          res.send("benvenuto");
          return;
        }
        res.sendFile('accessofallito.html', {root :'C:\/Users\/tacch\/Documents\/Scuola\/TIPSIT\/provaNode\/public'});
    });
  });
  
router.post('/register', (req, res) => {
    const dati = req.body;
    fs.readFile('./dati.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Errore durante la lettura del file JSON:', err);
        return;
    }
    const datiEsistenti = JSON.parse(data);
    const oggetto = {
      username: dati.username,
      password: dati.password
    }
    if(datiEsistenti.find((d) => dati.username === d.username && dati.password === d.password)){
      res.sendFile('registrazionefallita.html', {root: 'C:\/Users\/tacch\/Documents\/Scuola\/TIPSIT\/provaNode\/public'});
      return;
    }
      // Analizza il JSON esistente in un oggetto JavaScript
      // Aggiungi il nuovo oggetto all'array esistente o all'oggetto (a seconda della struttura del tuo file JSON)
    datiEsistenti.push(oggetto); 
      // Converti l'oggetto JavaScript con il nuovo oggetto in una stringa JSON
    const jsonString = JSON.stringify(datiEsistenti, null, 2);
      // Sovrascrivi il file JSON con i dati aggiornati
    fs.writeFile('./dati.json', jsonString, (err) => {
      if (err) {
        console.error('Errore durante la scrittura del file JSON:', err);
      } else {
        console.log('Nuovo oggetto aggiunto con successo al file JSON');
        res.send("Utente registrato con successo");
      }
    });
  });
});
module.exports = router;