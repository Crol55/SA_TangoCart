const mongoose = require('mongoose');

// Creacion de la tabla/Schema Product
const OrderSchema = new mongoose.Schema({
    user:{
        type: String, 
        required: [false, 'Please add a User orders']
    },
    shipping:{
        type: {}
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
module.exports = mongoose.model('Order',OrderSchema);