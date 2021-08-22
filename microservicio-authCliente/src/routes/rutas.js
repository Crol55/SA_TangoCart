
const express = require('express');
const controlador = require('../controllers/controlador');

var router = express.Router(); // Para manejar los 'Endopoints' a los que respondera este microservicio 

router.get('/test', (req, res)=>{ res.send('Todo bien'); });

router.post('/login', controlador.login);

router.post('/verify', controlador.verify);

router.post('/signup',controlador.signup);

module.exports = router;