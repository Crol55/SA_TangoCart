
const axios =  require('axios').default;

const ESB_API_URL = "http://35.192.90.40:7000";

function ESB_crear_producto (microservice, accion, data){
    
    axios.post(`${ESB_API_URL}/esb_log_default`, 
        {
            "microservicio": microservice, 
            "accion": accion, 
            "data" : data
        }).then( resp => {
            console.log("respuesta?",  resp.data);
        }
    )

}


function ESB_get_productos (microservice, accion, data){
    
    axios.post(`${ESB_API_URL}/esb_signup`, 
        {
            "microservicio": microservice, 
            "accion": accion, 
            "data" : data
           
        }).then( resp => {
            console.log("respuesta?", resp.data);
        }
    )

}

module.exports = {
    ESB_crear_producto,
    ESB_get_productos
}
