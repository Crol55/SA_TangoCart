// importacion de la tabla o modelo categoria
const Cart = require('../models/cart');


//Crear Cart
async function addCart(req,res){
        usuario  = await Cart.find({"user":req.body.user})
        if(usuario[0]){
             product =  usuario[0].items.find( p => p._id === req.body.items[0]._id)
             if(product){
                index =  usuario[0].items.indexOf(product)
                usuario[0].items.splice(index, 1);
                
                product.cantidad = product.cantidad + req.body.items[0].cantidad
                usuario[0].items.push(product)
                update = { items : usuario[0].items }
                carts = await Cart.findByIdAndUpdate(usuario[0]._id, update,{
                           new: true,
                           runValidators: true
                })

                res.status(200).json({ success: true, data: carts }); 

             }else{
                //se agrea un nuevo elemento al usuario
                usuario[0].items.push(req.body.items[0])
                update = { items : usuario[0].items }
                carts = await Cart.findByIdAndUpdate(usuario[0]._id, update,{
                        new: true,
                        runValidators: true
                });
                res.status(200).json({
                        success: true,
                        data: carts
                }); 
             }


        }else{
              const cart = await Cart.create(req.body);
              res.status(200).json({
                       success: true,
                       data: cart
               });     
        }
         
}

//Crear get
async function getCart(req,res){
        const cart = await Cart.find({"user": req.params.id});
        res.status(200).json(cart);        
}



//Actualizar producto
async function updateCart(req,res){
        
        cart    = await Cart.findById(req.params.id)
        
        product =  cart.items.find(p => p._id === req.body.items[0]._id)
        index =  cart.items.indexOf(product)
        cart.items.splice(index, 1);
        update = { items : cart.items }

        cart = await Cart.findByIdAndUpdate(req.params.id, cart,{
                      new: true,
                      runValidators: true
        })
        return res.status(200).json({ success: true, data: cart});
}

async function deleteCart(req,res){
       
    const cart = await Cart.findById(req.params.id);
    console.log(cart)
    if(cart){
      await cart.remove();  
      return res.status(200).json({
                success: true,
             });
    }
    return res.status(400).json({
        success: false,
        data: {}
    });

}

module.exports = {
        addCart: addCart,
        getCart: getCart,
        updateCart: updateCart,
        deleteCart: deleteCart
}