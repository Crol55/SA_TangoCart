// importar el modulo express para hacer uso del su metodo router
const express = require('express');

// importamos todas las funciones creadas en el controlador en el archivo de categoria
const { addOrder,
        getOrder,
        getOrders,
        getOrderUser,
        getAllOrders,
        putOrder
} = require('../controllers/order');

//hacemos uso del metodod Router para crear las rutas 
const router = express.Router();

// definimos las rutas y su tipo POST/GET/PUT/DELETE
router
    .route('/')
        .post(addOrder)
        .get(getOrders)

router
    .route('/:id')
        .get(getOrder)

router
    .route('/:id/:estado')
        .put(putOrder)
       
router
    .route('/user/:id')
        .get(getOrderUser)
        
router
    .route('/get/all')
        .get(getAllOrders)


// finalmente se exporta la variable router donde definimos las rutas de categoria
module.exports = router;