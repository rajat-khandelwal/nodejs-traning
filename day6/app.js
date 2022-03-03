const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();

let mongoosedb = mongoose.connect('mongodb://127.0.0.1:27017/companydatabase');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');


app.get('/',(req,res)=>{
    res.render('index.ejs');
})

app.get('/sendDetails',(req,res)=>{
    res.render('user.ejs',{user:"david", address:{city:"blr",street:"1234 sstreet"}});
})


app.listen(3600, function () {
    console.log("server started in Port 3600")
})

