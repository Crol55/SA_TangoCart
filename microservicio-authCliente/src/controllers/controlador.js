
// Logica de lo que se realizara para resolver una peticion de un usuario.


const jwt = require('jsonwebtoken'); // Para autenticar con JWT el inicio de sesion de un usuario (https://www.npmjs.com/package/jsonwebtoken)
const jwtPass = 'clienteSA';
const mongoDB = require('../DB/Mongo_DB');
const nodemailer = require("nodemailer");

const controler_esb_conexion =  require('./controller_ESB_conexion');



async function login(req, res){ // Idealmente tipo post

    //1) Verificar que el usuario y contraseña coincidan con la base de datos
    let userInfo = req.body;
    //console.log(userInfo);
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
            registro = registro[0]
            res.status(200).send( { 
                "id": registro._id, 
                "nombre": registro.nombre,
                "tipo": registro.tipo, 
                "correo": registro.correo, 
                "token":token
            } );
            // Guardar en el ESB 
            controler_esb_conexion.ESB_login_authCliente('auth_cliente', registro.correo, registro.tipo);
            
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
                return {"state":false, "mensaje":"Su token NO esta autorizado, inicie sesion, para obtener uno valido."};
            }
            
        }else {
            return {"state":false, "mensaje":"No se envio 'brearer | TOKEN' de authorization"};
        }

    }
    return {"state":false, "mensaje":"No se envio 'header' de authorization"};
}

/********************* FUNCIONES PAR BASE DE DATOS ************ */

async function get_usuario(filtro){
    
    let registro = await mongoDB.usuarioModel.find(filtro);
    return registro;
}



async function create_usuario(req,res){

    let {nombre,apellido,foto,correo,password,tipo,tarjetas} = req.body
    //console.log("data:",nombre,apellido,foto,correo,password,tipo,tarjetas);
    
    let newUser = {
        //_id: "carlosorantesgmail.com",
        "nombre": nombre,
        "apellido": apellido,
        "foto": foto || 'no_url',
        "correo": correo, 
        "password": password,
        "tipo": tipo,
        "tarjetas": tarjetas//[ {titular:'Carlos O. lara', numero:123456, vencimiento:'08/8/2021'}] 
    };
    //await mongoDB.connectDB();
    //console.log(typeof(newUser.tarjetas), newUser.tarjetas);
    //res.send(newUser);
    //return;
    try{
        //1) Antes de crear un usuario, verificar que el correo no se repita
        const usuario = await mongoDB.usuarioModel.find( {"correo":correo} );
        console.log(usuario);
        if(usuario.length === 0){
        
            const data = await mongoDB.usuarioModel.create(newUser);
            res.status(200).send( JSON.stringify({ info: "Su usuario ha sido registrado correctamente."}) );
            console.log("Nuevo usuario insertado a la base de datos:", data);

            // Almacenar en el ESB 
            controler_esb_conexion.ESB_signup_authCliente( (nombre +' '+ apellido), 'authCliente', correo, tipo)
        
        }else {
            res.status(409).send( JSON.stringify( { info: "El usuario con dicho correo ya existe."}) );
            console.log("El usuario que desea insertar es repetido");
        }
        
    }catch(e){
        console.log("Posible ERROR en base de datos(funcion:create_usuario)",e);
        res.status(500).send("Internal problem.");
    }   
        
}


async function sendEmail(req,res) {
   
    let { user, message }= req.body

    const usuario = await mongoDB.usuarioModel.find({"_id":user});
   
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, 
      auth: {
        user: 'servicewater2020@outlook.com',
        pass: 'servicioagua123'
      },
      tls: {
        ciphers:'SSLv3'
      }
    });
  
    let info = await transporter.sendMail({
      from: 'servicewater2020@outlook.com',
      to: usuario[0].correo, 
      subject: "Hello ✔, No replay Notify", 
      text: "TangoCart", 
      html: `<b>${message}</b>`, 
    });

    console.log("Message sent: %s", info.messageId);
    res.json({message:"Notificación enviada"});


  }
  

module.exports = {
    login:login, 
    verify:verifyAuth,
    signup:create_usuario,
    sendEmail:sendEmail
};