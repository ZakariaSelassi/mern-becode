let MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express()
let str="";
// Connection to the db

app.get('/', async (req,res) => {
    MongoClient.connect("mongodb+srv://dev:dev@mern-becode.plcvs.mongodb.net/test",function(err,client){
    let database = client.db('BanksDB'); 
    database.collection('terminals',function(err,collection){
        collection.find().toArray(function(err,items){
            if(err) throw err;

            res.send(items)
            })
        })
    })
})

app.listen(3001,() => {
    console.log('Server running on port 3001...');
})
