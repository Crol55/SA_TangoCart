const mongoose = require('mongoose');
const MONGO_URL = 'mongodb+srv://German:pass0000@cluster0.zwbuf.mongodb.net/tangoCart?retryWrites=true&w=majority';

const {listaDeseosModel} = require('./models/lista_deseos');
const {productsModel} = require("./models/products");
 
const connectDB = async () => {
    const conn = await mongoose.connect(MONGO_URL,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
 
    console.log(`MongoDB Connected: ${conn.connection.host}`);
};



module.exports = {
    connectDB, 
    listaDeseosModel, 
    productsModel
};