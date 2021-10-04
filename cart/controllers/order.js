const Order = require('../models/order');


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


module.exports = {
    addOrder : addOrder,
    getOrder : getOrder,
    getOrderUser : getOrderUser,
    getOrders : getOrders,
} 