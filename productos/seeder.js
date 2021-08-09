const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');


dotenv.config({ path: './config/config.env'});

const categorias_data = require('./models/categories');
const productos_data = require('./models/products');

// Connec to DB
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON files
const categorias = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/categories.json`, 'utf-8')
);

const productos = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8')
);


const importData = async () => {
    try {
      await categorias_data.create(categorias);
      await productos_data.create(productos);
      console.log('Data Imported...'.green.inverse);
      process.exit();
    } catch (err) {
      console.error(err);
    }
};

// Delete data
const deleteData = async () => {
    try {
      await categorias_data.deleteMany();
      await productos_data.deleteMany();
      console.log('Data Destroyed...'.red.inverse);
      process.exit();
    } catch (err) {
      console.error(err);
    }
  };

if (process.argv[2] === '-i') {
    importData(); 
} else if (process.argv[2] === '-d') {
    deleteData();
}