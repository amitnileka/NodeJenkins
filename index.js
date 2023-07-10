const express = require('express');
const appForBook = require('./books');

const app = express();





app.use(express.json());



app.use('/books',appForBook);



app.listen(8888,()=>{
    console.log("Port Started");
})