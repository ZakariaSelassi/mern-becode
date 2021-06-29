let MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express()
const cors = require('cors')
let str="";

// Connection to the db
app.use(express.json())
app.use(cors())

app.get('/read', async (req,res) => {
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

app.get('/readBanks', async (req,res) => {
    MongoClient.connect("mongodb+srv://dev:dev@mern-becode.plcvs.mongodb.net/test",function(err,client){
    let database = client.db('BanksDB'); 

    database.collection('terminals').aggregate([
        {  
            $lookup:
            {
                from: 'banks',
                localField: 'bank',
                foreignField: '_id',
                as: 'terminalsdetails'
            }

        }
    ]).toArray(function(err,item){
        if(err) throw err;
        res.send(item);
        client.close();
    });

    /*database.collection('banks',function(err,collection){
        collection.find().toArray(function(err,items){
            if(err) throw err;
            res.send(items)
            })
        })
    })*/
    })
})

app.listen(3001,() => {
    console.log('Server running on port 3001...');
})
