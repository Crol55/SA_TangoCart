

const log = require('../utils/log')


/****
*** Comunicacion con microservicio authProveedor y authCliente
****/

function log_signup(req,res ) {

    let {fullname, email, user_type, service_name} = req.body;

    if (fullname && email && user_type && service_name){

        let signup_prototype = {

            "microservice": service_name,
            "accion": 'signup',
            "name": fullname, 
            "correo": email,
            "user_type": user_type
        }
        
        log.saveLog(signup_prototype)
    
        res.status(200).send( {"info":"Saved signup info into log"} );
        
    }else {
        res.status(404).send( {"info":"None"} );
    }
    
}


function log_login (req, res){

    let {email, user_type, service_name} = req.body; 

    if (email && user_type && service_name){

        let login_prototype = {

            "microservice": service_name,
            "accion": "login",
            "correo": email,
            "user_type": user_type     
        }
    
        log.saveLog(login_prototype)

        res.status(200).send( {"info":"Saved info in log"} );
    }else {
        res.status(404).send( {"info":"None"} );
    }

}

function log_default (req, res){

    let microservice_metaData = req.body;
    
    if ( typeof(microservice_metaData) === 'object' ){

        // ##### Almacenar la informacion en el ESB
        log.saveLog(microservice_metaData); 
        // ##### 
        res.status(200).send( {"info": "Saved info into log"}); 

    }else {
        res.status(404).send( {"info":"None"} );
    }
}

module.exports = {
    log_signup, 
    log_login,
    log_default
}


