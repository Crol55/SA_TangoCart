const axios =  require('axios').default;

const ESB_API_URL = "http://localhost:7000";


function ESB_login_authProveedor (microservice, correo, tipo_usuario){
    
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


function ESB_signup_authProveedor (fullname, microservice, correo, tipo_usuario){
    
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
    ESB_login_authProveedor,
    ESB_signup_authProveedor
}
