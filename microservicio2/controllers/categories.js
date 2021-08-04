// importacion de la tabla o modelo categoria
const Categories = require('../models/categories');


//Crear Categoria
async function addCategory(req,res){
        const categoria = await Categories.create(req.body);
        return res.status(200).json({
                success: true,
                data: categoria
               });
}

// Obtener todas las categorias
async function getCategories(req,res){
        const categories = await Categories.find();
        return res.status(200).json({
                 success: true,
                 data: categories
               });
}

// Eliminar Categoria
async function deleteCategory(req,res){
    const categoria = await Categories.findById(req.params.id);
    if(categoria){
        await categoria.remove();
        return res.status(200).json({
               success: true,
               data: {}
        });
    }
    return res.status(200).json({
            success: false,
            data: {}
          });
}

module.exports ={
    addCategory:addCategory,
    deleteCategory:deleteCategory,
    getCategories: getCategories
}