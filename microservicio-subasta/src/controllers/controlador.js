// Logica de lo que se realizara para resolver una peticion de un usuario.

const mongoDB = require('../DB/Mongo_DB');
const mongoose = require('mongoose');

async function get_auctions(req, res){    
    // subastas
    const data = await mongoDB.subastaModel.aggregate(
        [
            {
                $lookup:
                {
                    from: "usuarios", // 2
                    localField: "usuarios", // 1
                    foreignField: "_id", // 2
                    as: "usuarios"
                }
            },
            { $unwind: "$usuarios" },
            {
                $lookup:
                {
                    from: "products", // 2
                    localField: "products", // 1
                    foreignField: "_id", // 2
                    as: "products"
                }
            },
            { $unwind: "$products" },
            {
                $lookup:
                {
                    from: "usuarios", // 2
                    localField: "propietario", // 1
                    foreignField: "_id", // 2
                    as: "propietario"
                }
            },
            { $unwind: "$propietario" },
            { $match: { estado: "Activa" } }
        ]
    );
    res.status(200).send(data);
}

async function get_auction(req, res){    
    // subastas
    const data = await mongoDB.subastaModel.aggregate(
        [
            {
                $lookup:
                {
                    from: "usuarios", // 2
                    localField: "usuarios", // 1
                    foreignField: "_id", // 2
                    as: "usuarios"
                }
            },
            { $unwind: "$usuarios" },
            {
                $lookup:
                {
                    from: "products", // 2
                    localField: "products", // 1
                    foreignField: "_id", // 2
                    as: "products"
                }
            },
            { $unwind: "$products" },
            {
                $lookup:
                {
                    from: "usuarios", // 2
                    localField: "propietario", // 1
                    foreignField: "_id", // 2
                    as: "propietario"
                }
            },
            { $unwind: "$propietario" },
            { $match: { _id: mongoose.Types.ObjectId(req.query._id) } }
        ]
    );
    res.status(200).send(data);
}

async function add_auction(req, res){
    const {propietario, usuarios, products, estado, oferta, fecha_final} = req.body;
    let newAuction = {
        "propietario" : mongoose.Types.ObjectId(propietario),
        "usuarios" : mongoose.Types.ObjectId(usuarios),
        "products" : mongoose.Types.ObjectId(products),
        "estado" : estado,
        "oferta" : oferta,
        "fecha_final" : fecha_final
    };

    //console.log(newAuction);
    
    try{
        const data = await mongoDB.subastaModel.create(newAuction);
        res.status(201).send( JSON.stringify({ mensaje: "Nueva subasta insertada a la base de datos."}) );
        //console.log("Nueva subasta insertada a la base de datos:", data);
    }catch(e){
        console.log("Posible ERROR en base de datos(funcion:get_auction)");
        res.status(500).send("Internal problem.");
    }  
    
    //res.status(200).send("Ok!");
}

async function update_auction(req, res){
    const {_id, propietario, usuarios, products, estado, oferta, fecha_final} = req.body;
    let newAuction = {
        "propietario" : mongoose.Types.ObjectId(propietario),
        "usuarios" : mongoose.Types.ObjectId(usuarios),
        "products" : mongoose.Types.ObjectId(products),
        "estado" : estado,
        "oferta" : oferta,
        "fecha_final" : fecha_final
    };

    try{
        const data = await mongoDB.subastaModel.findByIdAndUpdate(mongoose.Types.ObjectId(_id), newAuction, {
            new: true,
            runValidators: true
        });
        res.status(204).send( JSON.stringify({ mensaje: "Subasta actualizada en la base de datos."}) );
        console.log("Subasta actualizada en la base de datos:", data);
    }catch(e){
        console.log("Posible ERROR en base de datos(funcion:update_auction)");
        res.status(500).send("Internal problem.");
    }
}

async function delete_auction(req, res){
    const {_id} = req.body;
    try{
        const data = await mongoDB.subastaModel.findByIdAndRemove(_id);
        res.status(202).send( JSON.stringify({ mensaje: "Subasta eliminada en la base de datos."}) );
        console.log("Subasta eliminada en la base de datos:", data);
    }catch(e){
        console.log("Posible ERROR en base de datos(funcion:delete_auction)");
        res.status(500).send("Internal problem.");
    }
}

module.exports = {
    get_auction: get_auction, 
    get_auctions: get_auctions,
    add_auction: add_auction,
    update_auction: update_auction,
    delete_auction: delete_auction
};