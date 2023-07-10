const express = require('express');
const mysql = require('mysql');
const appForBook = express.Router();

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'manager',
    database : 'mydb'
}) 


appForBook.get('/:author',(request,response)=>{

    var sql = `select * from book where author='${request.params.author}'`;
    connection.query(sql,(error,result)=>{
        
        if(error){
            response.setHeader("Content-Type","application/json");    
            response.send(error);
        }
        else{
            response.setHeader("Content-Type","application/json");
            var data = JSON.stringify(result);
            response.send(data);
        }

    });

    

})

appForBook.post("/", (request, response)=>{
    var query = 
    `insert into book values(${request.body.id}, '${request.body.b_name}','${request.body.author}','${request.body.book_type}',${request.body.price},'${request.body.publishedDate}','${request.body.language}')`;

    connection.query(query, (error, result)=>{
        if(error==null)
        {
            var data = JSON.stringify(result) 
            response.setHeader("Content-Type","application/json");
            response.write(data);
        } 
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error)
        }
        response.end();
})
})

appForBook.put('/:bNo',(request,response)=>{
    
    let sql = `update book set price ='${request.body.price}' , language ='${request.body.language}' where id= ${request.params.bNo} `;


    connection.query(sql, (error,result)=>{
        response.setHeader("Content-Type","application/json");
        if(error){
            response.send(error);
        }
        else{
            response.send(JSON.stringify(result));
        }
    })

})


module.exports = appForBook;