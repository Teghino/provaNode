const sequelize = require('./seq.js');
const User = require('./modello.js');

// Esempio: seleziona tutti gli utenti dalla tabella Utenti
User.findAll().then((users) => {
  console.log('Elenco di utenti:', users);
}).catch((error) => {
  console.error('Errore:', error);
});



const nuovoUtente = User.build({
  nome: 'Nome Utente',
  email: 'email@esempio.com',
  // Altri campi della tabella Utenti
});
nuovoUtente.save()
  .then((utente) => {
    console.log('Utente aggiunto con successo:', utente.get());
  })
  .catch((errore) => {
    console.error('Errore durante l aggiunta dell utente:', errore);
  });

// Chiudi la connessione al database quando hai finito
sequelize.close();
