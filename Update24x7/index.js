const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const express = require('express');
const port = 5000;
const path = require('path');
const sendMail = require("./routers/sendemail");
const app = express();
const News = require('./module/news');

let mongoosedb = mongoose.connect('mongodb://127.0.0.1:27017/update247admin');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/contact', function (req, res) {
    res.render('contact');
})


app.get('/about', function (req, res) {
    res.render('about');
})

app.get('/sports', function (req, res) {
    res.render('sports');
})

app.get('/', function (req, res) {

    var curentDate = new Date();

    News.find({ createdDate: curentDate }, function (err, news) {
        res.render('home', { data: news });
    });

})

app.post('/contact', async function (req, res) {
    console.log(req);
    await sendMail.SendMail(req.body);
    res.render('contact');
})

app.listen(port, (err) => {
    if (err) throw err;
    console.log("server is running on ", port)
})
