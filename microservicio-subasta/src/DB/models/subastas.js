// Importar el modulo moongoose para crear una tabla/schema
const mongoose = require('mongoose');

const {Schema} = mongoose;
// Creacion del schema/tabla para almacenar las subastas

const schema_subasta = new Schema({
    usuarios: { 
        type: mongoose.Types.ObjectId, required:true
    },
    products: {
        type: mongoose.Types.ObjectId, required:true
    }, 
    estado:{
        type:String, trim:true, required:[true, 'Ingrese el estado de la subasta.']
    },
    oferta:{
        type:Number, required:true
    },
    fecha_final:{
        type: Date, required:true
    },
    fecha_inicial:{
        type: Date, required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/* Exportar el modelo para utilizarlo en otra clase
   modelo: El modelo luego se traduce en la tabla en la base de datos de MONGO.
*/

const modelo = mongoose.model('subasta',schema_subasta);
module.exports = {
    subastaModel: modelo
};