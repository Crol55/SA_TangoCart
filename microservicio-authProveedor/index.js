
const express = require ('express');
const cors = require('cors');
const rutas = require('./src/routes/rutas');
const Mongo_DB = require('./src/DB/Mongo_DB');

const change = "Este string solo para testear que hubieron cambios en las imagenes de docker y jenkins construye de manera correcta"

const puerto = process.env.PORT || 4001;

Mongo_DB.connectDB();

const app = express(); 
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json()); // Indica como leer el Json Request enviado por el usuario(req.body, req.header, etc)
    app.use('/', rutas);

app.listen(puerto, ()=>{
    console.log("Servidor Login en el puerto", puerto);
});

