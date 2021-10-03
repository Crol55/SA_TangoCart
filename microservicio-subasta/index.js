const express = require ('express');
const cors = require('cors');
const rutas = require('./src/routes/rutas');
const Mongo_DB = require('./src/DB/Mongo_DB');

const puerto = process.env.PORT || 4080;

// Conectarse a la base de datos globalmente ( configuracion )
Mongo_DB.connectDB();

const app = express(); 
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json()); // Indica como leer el Json Request enviado por el usuario(req.body, req.header, etc)
    app.use('/', rutas);

    app.listen(puerto, ()=>{
        console.log("Servidor Subastas en el puerto", puerto);
    });

//let co = 'hola mundo';
//
//let x = co.split(" ");
//
//console.log(x[2]);