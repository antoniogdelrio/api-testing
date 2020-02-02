const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const usersRouter = require('./routes/user');
const productsRouter = require('./routes/products');

require('dotenv').config();

const app = express();
const port = 3333;

const env = process.env.NODE_ENV;
let envString = env.toUpperCase()
envString = envString.slice(0,envString.length-1);

const dbName = process.env['DB_NAME_' + envString]
console.log(dbName);
const dbUserName = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

mongoose.connect('mongodb+srv://' + dbUserName + ':' + dbPassword + '@cluster0-5zym1.mongodb.net/' + dbName + '?retryWrites=true&w=majority', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

app.listen(port, (req,res)=>{
    console.log("App rodando na porta 3333");
    console.log(process.env.NODE_ENV);
})

module.exports = app;