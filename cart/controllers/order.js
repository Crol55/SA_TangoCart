const Order = require('../models/order');
var ObjectID = require('mongodb').ObjectID; 

async function addOrder(req,res){
    const order = await Order.create(req.body);
    res.status(200).json(order);     
}

async function getOrders(req,res){
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);   
         
}

async function getOrderUser(req,res){
    const order = await Order.find({user:req.params.id});
    res.status(200).json(order);        
}


async function getOrder(req,res){
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);        
}

async function getAllOrders(req,res){
    const data = await Order.find();
    res.status(200).json(data);        
}

async function putOrder(req,res){

    console.log(req.params.id, req.params.estado);

    var filter = {_id: ObjectID(req.params.id),};
    var UpdateQuery = {$set: {estado: req.params.estado}}
    Order.updateOne(filter, UpdateQuery, function(updateError, updateResponse){
        if (updateError) throw updateError;
        console.log(updateResponse);
        res.status(204).send({msg:"updated"});
    });     
}


module.exports = {
    addOrder : addOrder,
    getOrder : getOrder,
    getOrderUser : getOrderUser,
    getOrders : getOrders,
    getAllOrders: getAllOrders,
    putOrder: putOrder
} 