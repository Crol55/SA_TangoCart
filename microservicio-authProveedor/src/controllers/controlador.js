
// Logica de lo que se realizara para resolver una peticion de un usuario.


const jwt = require('jsonwebtoken'); // Para autenticar con JWT el inicio de sesion de un usuario (https://www.npmjs.com/package/jsonwebtoken)
const jwtPass = 'ProveedoresSA2021';

function login(req, res){ // Idealmente tipo post

    let userInfo = req.body;
    // JWT: Se compone de 3 partes: header . payload . firma -> se codifica con (HMAC u otros) 
    jwt.sign( userInfo, jwtPass, (err, token)=>{
    
        //res.send("Respuesta a solicitud de login");
        console.log('token:',token);
        res.send( {"Token":token} );
    }) // asyncrona

    //console.log(userInfo);
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



module.exports = {
    login, 
    verify: verifyAuth
};