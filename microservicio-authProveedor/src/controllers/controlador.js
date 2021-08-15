
// Logica de lo que se realizara para resolver una peticion de un usuario.

const jwt = require('jsonwebtoken'); // Para autenticar con JWT el inicio de sesion de un usuario (https://www.npmjs.com/package/jsonwebtoken)
const jwtPass = 'ProveedoresSA2021';
const mongoDB = require('../DB/Mongo_DB');


async function login(req, res){ // Idealmente tipo post

    //1) Verificar que el usuario y contraseña coincidan con la base de datos
    let userInfo = req.body;

    let filtro = {
        "correo":userInfo['correo'], 
        "password":userInfo['password']
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
        res.status(404).send( {"mensaje":"Error en su contraseña O el usuario no existe"} );
    }
    
    
}


async function get_usuario(filtro){
    let registro = await mongoDB.usuarioModel.find( filtro);
    return registro;
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
                user_data = jwt.verify(token, jwtPass); 
                //console.log(user_data);
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

// ************ OPERACIONES CON USUARIOS ***************************

async function create_usuario(req,res){

    let {nombre,apellido,foto,correo,password,tipo,tarjetas} = req.body
    //console.log("data:",nombre,apellido,foto,correo,password,tipo,tarjetas);
    
    let newUser = {
        //_id: "carlosorantesgmail.com",
        "nombre": nombre,
        "apellido": apellido,
        "foto": foto,
        "correo": correo, 
        "password": password,
        "tipo": tipo,
        "tarjetas": tarjetas//[ {titular:'Carlos O. lara', numero:123456, vencimiento:'08/8/2021'}] 
    };
    //await mongoDB.connectDB();
    
    try{
        //1) Antes de crear un usuario, verificar que el correo no se repita
        const usuario = await mongoDB.usuarioModel.find( {"correo":correo} );
        console.log(usuario);
        if(usuario.length === 0){
        
            const data = await mongoDB.usuarioModel.create(newUser);
            res.status(201).send( JSON.stringify({ mensaje: "Nuevo usuario insertado a la base de datos."}) );
            console.log("Nuevo usuario insertado a la base de datos:", data);
        }else {
            res.status(409).send( JSON.stringify( { mensaje: "El usuario con dicho correo ya existe."}) );
            console.log("El usuario que desea insertar es repetido");
        }
        
    }catch(e){
        console.log("Posible ERROR en base de datos(funcion:create_usuario)");
        res.status(500).send("Internal problem.");
    }   
        
}

//create_usuario();

module.exports = {
    login, 
    verify: verifyAuth, 
    signup: create_usuario
};