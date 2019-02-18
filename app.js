const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products')
const userRoutes = require('./api/routes/user');


const app = express();

app.use(express.static("public"));

mongoose.connect(`mongodb://project:${process.env.MONGO_ATLAS_PW}@cluster0-shard-00-00-zqyw8.mongodb.net:27017,cluster0-shard-00-01-zqyw8.mongodb.net:27017,cluster0-shard-00-02-zqyw8.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`, {
    useMongoClient: true,
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use((req,res,next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     if(req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({})
//     }

// })

app.get('/',(req,res) => {
    
});

app.use('/products', productRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const err = new Error('not foiund');
    err.status = 404;
    next(err);
    
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })

    // next(err);
    
})

// (req,res,next) => {
//     res.status(200).json({
//         message: 'it works!'
//     });
// module.exports = app;} 
module.exports = app;