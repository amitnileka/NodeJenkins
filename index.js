const express = require('express');
const appForBook = require('./books');

const app = express();





app.use(express.json());



app.use('/books',appForBook);

app.get('/',(request,response)=>{
    response.send("Welcome to book website");
})

app.listen(8888,()=>{
    console.log("Port Started");
})