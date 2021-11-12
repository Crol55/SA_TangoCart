const Compra = require('../models/compra');

async function compras(req,res){ 
    
    try {
        const compra = await Compra.create(req.body);
        return res.status(200).json({
            mgs : "Compra exitosa"
        });
    } catch (error) {
        return res.status(400).json({
            mgs : error
        });
    } 
    
}

module.exports = {
   
    compras: compras
} 