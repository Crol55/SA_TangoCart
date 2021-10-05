// Create, find, findbyid

let {listaDeseosModel, productsModel} = require('../DB/Mongo_DB');



async function guardar_producto(req, res) { // Almacena un producto en la tabla lista_deseos
    
    console.log("lista_deseos.js -> save product");
    let {id_usuario, id_producto} = req.body;
    
    try{
        // 1) Verificar si el usuario ya tiene una lista de deseos asociada
        let registro_listaDeseos = await listaDeseosModel.find( {"id_usuario": id_usuario} );
        
        if (registro_listaDeseos.length > 0){
            // Actualizar la lista de deseos
            // 2) Insertar el id_producto si y solo si no existe
            //console.log(registro_listaDeseos);    
            let registro = registro_listaDeseos[0];

            let existe_producto = buscar_producto(registro.lista_idProducto, id_producto);
            
            if ( !existe_producto ){
                // Si el producto es nuevo, actualizamos la lista de deseos del usuario
                
                registro.lista_idProducto.push( {"id_producto": id_producto});
                
                await listaDeseosModel.updateOne( { "_id": registro._id }, 
                    { $push: { 
                        "lista_idProducto": { "id_producto": id_producto} 
                        }
                    } 
                )
                //console.log("almacenaste?", status);
            }
            res.status(201).send( JSON.stringify({ mensaje: "Producto agregado a su lista de deseos", state: true}) );
            
        }else { // El registro no existe
            // Crear una nueva lista de deseos asociada al usuario
            let nuevo_registro = {
                "id_usuario": id_usuario, 
                "lista_idProducto": [ {"id_producto": id_producto} ]
            }
        
            console.log("datos enviados ->", nuevo_registro);

            let registro_insertado = await listaDeseosModel.create(nuevo_registro); // Crea el registro

            if (registro_insertado == undefined)
                res.status(500).send( JSON.stringify({ mensaje: "Error interno de la base de datos", state: false})  );

            console.log("Lista_deseos:\n Nuevo registro insertado", registro_insertado);

            res.status(201).send( JSON.stringify({ mensaje: "Producto agregado a su lista de deseos", state: true}) );
        }
        //res.send("cherap");  

    }catch(e){
        console.log("Posible ERROR en base de datos, funcion guardar_producto()");
        res.status(500).send( JSON.stringify({ mensaje: "Internal problem", state: false}) );
    }

}


async function fetch_listaDeseos(req, res){
    console.log("fetch a lista deseos");
    let {id_usuario} = req.query; 

    let registros =  await listaDeseosModel.find( {"id_usuario":id_usuario} ); // retorna array
    
    if (registros.length > 0){

        //console.log("Que trajo", id_usuario, registros);
        let registro_listaDeseos = registros[0];

        let array_of_idProducto = [];

        registro_listaDeseos.lista_idProducto.filter( registro => {
            array_of_idProducto.push( registro.id_producto ); //mongoose.Types.ObjectId (registro.id_producto)
        } );
        //console.log("Que hay ", array_of_idProducto);
        let products_documents = await productsModel.find( { "_id": { $in: array_of_idProducto } } ); // filtrar los registros
        //console.log(products_documents);
        res.status(200).send( JSON.stringify({ mensaje: products_documents, state: true}) );
    }else{

    }

}

async function delete_producto_from_listaDeseos(req, res){

    let {id_usuario, id_producto} = req.body;
    console.log("si llego ?", id_usuario, id_producto);
    // documentacion https://mongoosejs.com/docs/documents.html -> https://docs.mongodb.com/manual/reference/operator/update/
    let resultado = await listaDeseosModel.updateOne( {id_usuario: id_usuario}, { $pull: { "lista_idProducto": {"id_producto":id_producto} } } )
    console.log(resultado);
    res.status(200).send(JSON.stringify( {state: true}));
}

// ********* Funciones extras *******
function buscar_producto(array, id_producto){

    let registro = null;
    for (let i = 0; i < array.length; i++){

        registro = array[i]; 
        if (registro.id_producto == id_producto)
            return true;
    }
    return false;
}


module.exports = {
    guardar_producto, 
    fetch_listaDeseos, 
    delete_producto: delete_producto_from_listaDeseos
};