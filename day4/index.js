const express = require('express');
const fs = require('fs');
const app = express();
const https = require('https');
const bodyParser = require("body-parser");
const sendMail=require("./sendemail");
const db = require('./db');
const cards = require('./models/cards');
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/adminDashboard', function (req, res) {
    cards.find(function (err, adminLogins) {
        res.render('adminDashboard', {data:appendDate(adminLogins)});
    });
})


app.post('/AddOrder', function (req, res) {
    var newcards = new cards(req.body);
    newcards.save(function (err) {
        if (err) {
            res.status(400).send('Unable to save shark to database');
        } else {
            res.redirect("/adminDashboard");
        }
    });
})

app.get('/SendMail',async function (req, res) {
    await sendMail.SendMail();
    res.redirect("/adminDashboard");
})

function appendDate(data){
var curentDate=new Date().toDateString();
var oneDayBack=new Date();
oneDayBack.setDate(oneDayBack.getDate()- 1);
oneDayBack=oneDayBack.toDateString()
var data1=[];
data.forEach(element => {
        if(element.createdDate.toDateString()==curentDate){
            element.Status="In progres";
         
        }
        else if(element.createdDate.toDateString()==oneDayBack){

            element.Status="Dispatched";
        }
        else{
            element.Status="Delivered";
        }
        data1.push(element);
    });
    return data1;
}

app.listen(port, (err) => {
    if (err) throw err;
    console.log("server is running on ", port)
})