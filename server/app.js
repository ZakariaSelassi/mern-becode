let MongoClient = require('mongodb').MongoClient;

// Connection to the db

MongoClient.connect("mongodb+srv://dev:dev@mern-becode.plcvs.mongodb.net/test",function(err,client){
    let database = client.db('BanksDB'); 
    database.collection('terminals',function(err,collection){
        collection.find().toArray(function(err,items){
            if(err) throw err;
            console.log(items)
        })
    })
})