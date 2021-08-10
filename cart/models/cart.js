const mongoose = require('mongoose');

// Creacion de la tabla/Schema Product
const ProductsSchema = new mongoose.Schema({
    usuario:{
        type: String,
        trim: true,
    },
    items:{
        type: Array,
        trim: true,
        required: [true, 'Please add a cart items']
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
})