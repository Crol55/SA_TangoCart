// importación de la tabla producto o modelo producto
const Product = require('../models/products');

//Crear Producto
async function addProduct(req,res){
    const product = await Product.create(req.body);
    return res.status(200).json({
        success: true,
        data: product
    });
}

// Obtener todos los productos
async function getProducts(req,res){
    const products = await Product.find();
    return res.status(200).json({
        success: true,
        data: products
    });

}
// Obtener un producto en especifico
 async function getProduct(req,res){
    
    const product = await Product.findById(req.params.id)
    
    if(product){
     return res.status(200).json({
             success: true,
             data: product
         });
     }
    return res.status(400).json({
        success: false,
        data: {}
    });
}


//Actualizar producto
async function updateProduct(req,res){
    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
    })
    return res.status(200).json({
        success: true,
        data: product
    });
}


// Eliminar Producto
async function deleteProduct(req,res){
    const product = await Product.findById(req.params.id);
    if(product){
      await product.remove();  
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
    addProduct: addProduct,
    getProducts: getProducts,
    getProduct: getProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
}


