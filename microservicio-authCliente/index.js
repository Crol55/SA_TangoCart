console.log("hola mundo para el proyecto");

const express = require ('express');
const cors = require('cors');

const puerto = process.env.PORT || 4000;

const app = express(); 
    app.use(cors());


    app.listen(puerto, ()=>{
        console.log("Servidor Login en el puerto", puerto);
    });