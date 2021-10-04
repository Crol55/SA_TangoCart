
const express = require ('express');

const cors = require('cors');

const ruta_lista_deseo = require('./src/routes/lista_deseos');
const Mongo_DB = require('./src/DB/Mongo_DB');

const puerto = process.env.PORT || 5001;

// Conectarse a la base de datos globalmente ( configuracion )
Mongo_DB.connectDB();

const app = express(); 

    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json()); // Indica como leer el Json Request enviado por el usuario(req.body, req.header, etc)
    app.use('/', ruta_lista_deseo);

    app.listen(puerto, ()=>{
        console.log("Servidor Login en el puerto", puerto);
    });


