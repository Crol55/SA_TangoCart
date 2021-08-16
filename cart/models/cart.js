const mongoose = require('mongoose');

// Creacion de la tabla/Schema Product
const CartSchema = new mongoose.Schema({
    user:{
        type: String,
        trim: true,
    },
    items:{
        type: Array,
        trim: true,
        required: [true, 'Please add a cart items']
    },
    state: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
})
module.exports = mongoose.model('Cart',CartSchema);