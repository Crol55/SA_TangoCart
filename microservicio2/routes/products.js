// importar el modulo express para hacer uso del su metodo router
const express = require('express');

// importamos todas las funciones creadas en el controlador del archivo products.js
const { getProducts,
        getProduct, 
        addProduct, 
        updateProduct,
        deleteProduct 
} = require('../controllers/products');

//hacemos uso del metodod Router para crear las rutas 
const router = express.Router();

// definimos las rutas y su tipo POST/GET/PUT/DELETE
router
    .route('/')
        .post(addProduct)
        .get(getProducts);

router
    .route('/:id')
        .get(getProduct)
        .put(updateProduct)
        .delete(deleteProduct);

// finalmente se exporta la variable router donde definimos las rutas de categoria
module.exports = router;