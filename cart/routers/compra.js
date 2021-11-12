// importar el modulo express para hacer uso del su metodo router
const express = require('express');

const { 
     compras
} = require('../controllers/compra');

//hacemos uso del metodod Router para crear las rutas 
const router = express.Router();

// definimos las rutas y su tipo POST/GET/PUT/DELETE
router
    .route('/api/users/compra')
        .post(compras)
        


module.exports = router;