const express = require('express')
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient; // db connection 
const app = express();

const MongoURL = 'mongodb://127.0.0.1:27017/';
const port = 3300;

//express middlware section 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


// mongodb connection configuration
let db;
const client = new MongoClient(MongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// first connect to the database and then start the node server
client.connect((err, database) => {
    if (err) {
        throw err;
    } else {
        db = client.db('employeedatabase');
        app.listen(port, function () {
            console.log("server started in Port", port)
        })
    }

})


app.get('/getEmployees', (req, res) => {

    db.collection('company').find().toArray((err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    })
});

app.post('/sendEmployeeDetails', (req, res) => {

    db.collection('company').insertOne(req.body, (perr, result) => {
        if (perr) {
            throw perr;
        } else {
            console.log('data inserted successfully');
            res.send(result);
        }
    });

});


app.put('/updateEmployee', (req, res) => {

    db.collection('company').updateOne({ name: req.body.name }, { $set: { address: req.body.address } }, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log('employee updated successfully');
            res.send(result);
        }
    })

})

app.delete('/deleteEmployee/:name', (req, res) => {


    db.collection('company').deleteOne({ name: req.params.name }, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log('employee deleted successfully');
            res.send(result);
        }
    })

})
