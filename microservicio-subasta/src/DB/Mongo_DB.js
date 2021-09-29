const mongoose = require('mongoose');
const MONGO_URL = 'mongodb+srv://German:pass0000@cluster0.zwbuf.mongodb.net/tangoCart?retryWrites=true&w=majority';

const {subastaModel} = require('./models/subastas');

 
const connectDB = async () => {
    const conn = await mongoose.connect(MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
 
    console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = {
    connectDB, 
    subastaModel
};