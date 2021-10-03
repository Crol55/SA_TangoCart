
// Importar el modulo moongoose para crear una tabla/schema
const mongoose = require('mongoose');

const {Schema} = mongoose;

const schema_lista_deseos = new Schema({

    id_usuario: { 
        type:String, trim:true, required:true
    },
    lista_idProducto:{
        type:Array, trim:true, required:false
    }
});

const newModelo = mongoose.model('lista_deseos', schema_lista_deseos);

module.exports = {
    listaDeseosModel: newModelo
}