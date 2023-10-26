const express = require('express');
const app = express();


const utentiRout = require('./router/utenti');

const bodyParser = require('body-parser');

app.use('/api', utentiRout);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('login.html', {root: __dirname + '/public'});
});




      

app.listen(3000);