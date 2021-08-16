
// Importar el modulo moongoose para crear una tabla/schema
const mongoose = require('mongoose');

const {Schema} = mongoose;
// Creacion del schema/tabla para almacenar los usuarios ( clientes && proveedores)

const schema_usuario = new Schema({

    nombre: { 
        type:String, trim:true, required:true
    },
    apellido: {
        type:String, trim:true, required:true
    }, 
    foto:{
        type:String, trim:true, required:[true, 'Inserte el URL de la foto']
    },
    correo:{
        type:String, trim:true, required:true
    },
    password:{
        type:String, trim:true, required:true
    },
    tipo:{
        type:String, trim:true, required:true
    },
    tarjetas:{
        type:Array, trim:true, required:false
    }
});

/* Exportar el modelo para utilizarlo en otra clase
   modelo: El modelo luego se traduce en la tabla en la base de datos de MONGO.
*/

const modelo = mongoose.model('usuario',schema_usuario);
module.exports = {
    usuarioModel: modelo
};