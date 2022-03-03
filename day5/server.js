const express = require('express')
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient; // db connection 
const app = express();

const MongoURL = 'mongodb://127.0.0.1:27017/';
const port=3300;

//express middlware section 
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());


app.get('/getEmployees',(req,res)=>{
    MongoClient.connect(MongoURL,(err,client)=>{
    if(err){
        throw err;
    }else{
        const db = client.db('employeedatabase');
        db.collection('company').find().toArray((err,result)=>{
            if(err){
                throw err;
            }else{
                res.send(result);
            }
        })
    }
})});

app.post('/sendEmployeeDetails',(req,res)=>{
    MongoClient.connect(MongoURL,(err,client)=>{
        if(err){
            throw err;
        }else{
            const db = client.db('employeedatabase');
            db.collection('company').insertOne(req.body,(perr,result)=>{
                if(perr){
                    throw perr;
                }else{
                    console.log('data inserted successfully');
                    res.send(result);
                }});
            }
    }); 
});


app.put('/updateEmployee',(req,res)=>{
    MongoClient.connect(MongoURL,(err,client)=>{
        if(err){
            throw err;
        }else{
            const db = client.db('employeedatabase');
            db.collection('company').updateOne({name:req.body.name},{$set:{address:req.body.address}},(err,result)=>{
                if(err){
                    throw err;
                }else{
                    console.log('employee updated successfully');
                    res.send(result);
                }
            })
        }
    })
})

app.delete('/deleteEmployee/:name',(req,res)=>{
    MongoClient.connect(MongoURL,(err,client)=>{
        if(err){
            throw err;
        }else{
            const db = client.db('employeedatabase');
            console.log(req.params)
            db.collection('company').deleteOne({name:req.params.name},(err,result)=>{
                if(err){
                    throw err;
                }else{
                    console.log('employee deleted successfully');
                    res.send(result);
                }
            })
        }
    })
})


app.listen(port,()=>{
    console.log("server started listening via port:",port);
})
