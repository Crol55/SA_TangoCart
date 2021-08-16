
// Logica de lo que se realizara para resolver una peticion de un usuario.


const jwt = require('jsonwebtoken'); // Para autenticar con JWT el inicio de sesion de un usuario (https://www.npmjs.com/package/jsonwebtoken)
const jwtPass = 'clienteSA';
const mongoDB = require('../DB/Mongo_DB');

async function login(req, res){ // Idealmente tipo post

    //1) Verificar que el usuario y contraseña coincidan con la base de datos
    let userInfo = req.body;

    let filtro = {
        "correo":userInfo['correo'], 
        "password":userInfo['password'], 
        "tipo": "C"
    };

    let registro = await get_usuario(filtro);
    //console.log(registro);
    if(registro.length > 0){
    // 2) Si existe el registro, entonces enviar token.
        // JWT: Se compone de 3 partes: header . payload . firma -> se codifica con (HMAC u otros) 
        jwt.sign( userInfo, jwtPass, (err, token)=>{
            console.log('token:',token);
            res.status(200).send( {"Token":token} );
        }) // asyncrona

    }else{
        res.status(404).send( {"mensaje":"Error en su contraseña, O el usuario no existe"} );
    }
    
}


function verifyAuth(req, res){
    // Verify token.. 
    //console.log(verityToken.constructor.name=== "AsyncFunction");
    let auth = verityToken(req.headers); // Analizar el bearer <token> 
    if(auth.state === true){
        res.json(auth);
    }else{
        res.json(auth);
    }
}



function verityToken(headers){

    // 1) Extraer el bearer token
    let bearerToken = headers['authorization'];
    if(bearerToken){

        let auth = bearerToken.split(" "); // [0]:'bearer', [1]: token
        let token = auth[1];
        if( auth[0] == 'bearer' && token != 'undefined' ){
            //2) Verificar que el token sea valido
            try{
                jwt.verify(token, jwtPass); 
                return {"state":true, "mensaje":"Su token esta autorizado"};

            } catch(err){
                return {"state":false, "mensaje":"Su token NO esta autorizado"};
            }
            
        }else {
            return {"state":false, "mensaje":"No se envio 'brearer | TOKEN' de authorization"};
        }

    }
    return {"state":false, "mensaje":"No se envio 'header' de authorization"};
}

/********************* FUNCIONES PAR BASE DE DATOS ************ */

async function get_usuario(filtro){
    let registro = await mongoDB.usuarioModel.find( filtro);
    return registro;
}




module.exports = {
    login:login, 
    verify: verifyAuth
};