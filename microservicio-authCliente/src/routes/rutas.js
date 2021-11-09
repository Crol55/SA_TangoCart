
const express = require('express');
const controlador = require('../controllers/controlador');

var router = express.Router(); // Para manejar los 'Endopoints' a los que respondera este microservicio 

router.get('/test', (req, res)=>{ res.send('Todo bien'); });

router.post('/api/users/signin', controlador.login);

router.post('/verify', controlador.verify);

router.post('/api/users/signup',controlador.signup);

router.post('/notify',controlador.sendEmail);

module.exports = router;