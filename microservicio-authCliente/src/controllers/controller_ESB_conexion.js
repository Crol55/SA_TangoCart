

const axios =  require('axios').default;

const ESB_API_URL = "http://35.192.90.40:7000";


function ESB_login_authCliente (microservice, correo, tipo_usuario){
    
    axios.post(`${ESB_API_URL}/esb_login`, 
        {
            "service_name": microservice, 
            "email": correo, 
            "user_type": tipo_usuario
        }).then( resp => {
            console.log("respuesta?",  resp.data);
        }
    )

}


function ESB_signup_authCliente (fullname, microservice, correo, tipo_usuario){
    
    axios.post(`${ESB_API_URL}/esb_signup`, 
        {
            "service_name": microservice, 
            "fullname": fullname,
            "email": correo, 
            "user_type": tipo_usuario

        }).then( resp => {
            console.log("respuesta?",  resp.data);
        }
    )

}


module.exports = {
    ESB_login_authCliente,
    ESB_signup_authCliente
}
