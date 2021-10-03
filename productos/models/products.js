/* importacion de modulo mongoose de este se obtiene
   todos los metodos necesarios para crear tabla/Schema  */ 
const mongoose = require('mongoose');

// Creacion de la tabla/Schema Product
const ProductsSchema = new mongoose.Schema({
    user: {
        type: String,
        trim: true,
        required: [true, 'Please add a product user']
    }, 
    nombre:{
        type: String,
        trim: true,
        required: [true, 'Please add a product titulo']
    },
    precio:{
        type: Number,
        trim: true,
        required: [true, 'Please add a product precio']
    },
    descripcion:{
        type: String,
        trim: true,
        required: [true, 'Please add a product descripcion']
    },
    categoria:{
        type: String,
        trim: true,
        required: [true, 'Please add a product categoria']
    },
    foto:{
        type: String,
        trim: true,
        required: [true, 'Please add a product image']
    },
    stock: {
        type: Number,
        trim: true,
        required: [true, 'Please add a product stock']
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
})

/* Finalmente se exporta el Schema con un nomgre definido 
  "Product" este será el nombre de la tabla/Schema */
module.exports = mongoose.model('Product',ProductsSchema);