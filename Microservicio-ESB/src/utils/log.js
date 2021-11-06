

const {v4} = require('uuid');


class log {

    log_array = [];  // Aqui se almacenaran todos los log_registry's
    
    constructor() {   

    }

    saveLog (data_de_microservicio){
       
        let date = new Date(); 
        let fechayhora = date.toLocaleString().split(' ');

        let fecha = fechayhora[0]; 
        let hora = fechayhora[1];

        let log_registry = {
            "id": v4(), 
            "microservice_info": data_de_microservicio,
            "hora": hora,
            "fecha": fecha 
        };
        
        this.log_array.push(log_registry);
        console.log(this.log_array);
    }
}

const main_log = new log();

module.exports = main_log;