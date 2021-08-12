
const express = require ('express');
const cors = require('cors');
const rutas = require('./src/routes/rutas');

const puerto = process.env.PORT || 4000;

const app = express(); 
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json()); // Indica como leer el Json Request enviado por el usuario(req.body, req.header, etc)
    app.use('/', rutas);

    app.listen(puerto, ()=>{
        console.log("Servidor Login en el puerto", puerto);
    });

//let co = 'hola mundo';
//
//let x = co.split(" ");
//
//console.log(x[2]);