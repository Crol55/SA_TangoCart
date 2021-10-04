
const express = require('express');
var router = express.Router(); // Para manejar los 'Endopoints' a los que respondera este microservicio 
var controlador = require('../controladores/lista_deseos');


router.post('/saveWishlist', controlador.guardar_producto);
router.get('/fetchwishlist', controlador.fetch_listaDeseos);


module.exports = router;