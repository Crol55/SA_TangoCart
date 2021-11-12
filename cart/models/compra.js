const mongoose = require('mongoose');

// Creacion de la tabla/Schema Product
const CompraSchema = new mongoose.Schema({
    idUser:{
        type: String, 
        required: [false, 'Please add a Iduser compra']
    },
    nit:{
        type: String, 
        required: [false, 'Please add a nit compra']
    },
    productos:{
        type: Array,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})
module.exports = mongoose.model('Compras',CompraSchema);