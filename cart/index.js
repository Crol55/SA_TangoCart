const express = require('express');
const path = require('path')
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const cors = require('cors');

//load env vars
dotenv.config({ path: './config/config.env'});

//connect to database
connectDB();

//Route files

const cart  = require('./routers/cart')

const app = express();

app.use(cors());
//Body parser
app.use(express.json());
// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Mount routers
app.use('/api/cart',cart);

const PORT = process.env.PORT || 3001 ;

const server = app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

process.on('unhandledRejection', (err,promise)=>{
    console.log(`Error: ${err.message}`.red);
    //Close server & exit process
    server.close(()=>process.exit(1))
})