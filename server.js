const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

const productscheme = require("./scheme/product")

const env = require("./env.json");
const PORT = process.env.PORT || env.PORT; 
const BASE_URL = env.BASE_URL1;

app.use(cors());
app.use(express.json({limit : "50mb"}));
app.use(express.static(__dirname));
const url = BASE_URL;
mongoose.connect(url, {
    useNewUrlParser:true,
    useCreateIndex : true,
    useFindAndModify: false,
    useUnifieldTopology : true
});

{
    const connection = mongoose.connection;
    connection.once("open", () =>{
        console.log('connection success');
    });

    app.get('/',(req,res) =>{
        res.json('hello world!');
    })

    const Admin = require('./router/admin');
    app.use("/api", Admin);
    const  modifyProduct = require('./router/product');
    app.use('/product', modifyProduct);

    app.listen(PORT,() =>{
        console.lof(`server start at ${PORT}`)
    })
}