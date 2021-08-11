
const express = require('express');
const controlador = require('../controllers/controlador');

var router = express.Router(); // Para manejar los 'Endopoints' a los que respondera este microservicio 

router.get('/test', (req, res)=>{ res.send('Todo bien'); });

router.post('/login', controlador.login);

module.exports = router;