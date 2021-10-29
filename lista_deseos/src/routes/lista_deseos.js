
const express = require('express');
var router = express.Router(); // Para manejar los 'Endopoints' a los que respondera este microservicio 
var controlador = require('../controladores/lista_deseos');


router.post('/saveWishlist', controlador.guardar_producto);
router.get('/fetchwishlist', controlador.fetch_listaDeseos);
router.delete('/deleteWishlist', controlador.delete_producto);

router.post("/testing", (req,res)=>{

    let vals = req.body; 
    console.log("Lo enviado por el frontend is:", vals);
    res.send("below behrybnone");
});
module.exports = router;