const express = require('express');
const router = express.Router('../index.js');
const fs = require('fs');
const bodyParser = require('body-parser');
const { dir } = require('console');
const { dirname } = require('path');
const sequelize = require('../sql/seq.js');


//router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'));

router.post('/login', (req, res) => {
    const dati = req.body;
    console.log(sequelize);
});
  
router.post('/register', (req, res) => {
    const dati = req.body;
    
});
module.exports = router;