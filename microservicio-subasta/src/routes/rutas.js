const express = require('express');
const controlador = require('../controllers/controlador');

var router = express.Router(); // Para manejar los 'Endopoints' a los que respondera este microservicio 

router.get('/test', (req, res)=>{ res.send('Todo bien'); });

router.get('/auction', controlador.get_auction);

router.post('/auction', controlador.add_auction);

router.put('/auction', controlador.update_auction);

router.delete('/auction', controlador.delete_auction);

module.exports = router;