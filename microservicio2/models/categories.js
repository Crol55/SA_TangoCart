/* importacion de modulo mongoose de este se obtiene
   todos los metodos necesarios para crear tabla/Schema  */ 
const mongoose = require('mongoose');


// Creacion de la tabla/Schema Category
const CategorySchema = new mongoose.Schema({
    nombre:{
        type: String,
        trim: true,
        required: [true, 'Please add a categoria titulo']
    },
    descripcion:{
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
})

/* Finalmente se exporta el Schema con un nomgre definido 
  "Category" este sera el nombre de la tabla/Schema */
module.exports = mongoose.model('Category',CategorySchema);