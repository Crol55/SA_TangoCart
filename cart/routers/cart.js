// importar el modulo express para hacer uso del su metodo router
const express = require('express');

// importamos todas las funciones creadas en el controlador en el archivo de categoria
const { addCart,
        getCart,
        updateCart,
        deleteCart,
        carritoAbandonado,
} = require('../controllers/cart');

//hacemos uso del metodod Router para crear las rutas 
const router = express.Router();



// definimos las rutas y su tipo POST/GET/PUT/DELETE
router
    .route('/')
        .post(addCart)
        


  
router
    .route('/:id')
        .get(getCart)
        .put(updateCart)
        .delete(deleteCart);

// finalmente se exporta la variable router donde definimos las rutas de categoria
module.exports = router;