// importación de la tabla producto o modelo producto
const Product = require('../models/products');
const path = require('path');
const controler_esb_conexion =  require('./controller_ESB_conexion');
// s3
const AWS = require('aws-sdk');
const aws_keys = require('./credenciales-aws');
var s3 = new AWS.S3(aws_keys.s3);
const { v4: uuidv4 } = require('uuid');

//variables
let encodeBase64;
var fs = require('fs');

//Crear Producto
async function addProduct(req,res){
    var {user,nombre,precio,descripcion,categoria,stock,foto,ext} = req.body
    
    let  idb = uuidv4();
    let ruta = `fotos/${idb}${ext}`

    // const paramsS3 = {
    //     Bucket: "proyecto-sa",
    //     Key:  ruta,
    //     Body: Buffer.from(foto,'base64'),
    //     ContentType: "image",
    //     ACL: 'public-read'
    // }
    // let result = await s3.putObject(paramsS3, (err,data)=>{
    //     if(err){
    //        return 'err'
    //     }else{
    //        return data
    //     }
    // }).promise();
    // if(result == 'err') return  res.send(JSON.stringify( {status:"400", success:"false"} )); 

    campos = {
        user: user,
        nombre: nombre,
        precio: precio,
        descripcion : descripcion,
        categorias : categoria,
        stock : stock,
        foto: foto
    }

    const product = await Product.create(req.body);
    
    controler_esb_conexion.ESB_crear_producto('Productos', 'Crear Producto',req.body);

    return res.status(200).json({
        mgs : "Producto registrado con exito"
    });
}

// Obtener todos los productos
async function getProducts(req,res){
    const products = await Product.find();
    controler_esb_conexion.ESB_get_productos('Productos', 'Obtener Productos',products);
    res.status(200).json(products);
}
// Obtener un producto en especifico
 async function getProduct(req,res){
    const product = await Product.findById(req.params.id);
    res.json(product);
}

// Obtener productos por usuario
async function getProductUser(req,res){
    const product = await Product.find({user: req.params.id});
    res.json(product);
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

async function uploadPhoto(req,res){

    const product = await Product.findById(req.params.id)

    if (!req.files) {
        return res.status(400).json({
               success: false,
               message: `Please upload a file`
        });
    }

    const file = req.files.files
    
    console.log(file)

    // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return res.status(400).json({
                success: false,
                message: `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`
            });

  }
  // Create custom filename
  file.name = `photo_${product._id}${path.parse(file.name).ext}`;
        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                    success: false,
                    message: `Problem with file upload`
                    });
        }
        await Product.findByIdAndUpdate(req.params.id, { imagen: file.name });
        res.status(200).json({
          success: true,
          data: file.name
        });
    });

}


function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}


module.exports = {
    addProduct: addProduct,
    getProducts: getProducts,
    getProduct: getProduct,
    getProductUser:getProductUser,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    uploadPhoto : uploadPhoto
}


