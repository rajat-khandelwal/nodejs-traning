const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const Users = require('./models/users');
const News = require('./models/news');
const port = 3000;
const path = require('path');
var testRoutes = require('./news');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const cookieParser = require('cookie-parser')

const auth = require("./middleware/auth");
// Import my test routes into the path '/test'

const app = express();
app.use(cookieParser())
let mongoosedb = mongoose.connect('mongodb://127.0.0.1:27017/update247admin');


app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/css', express.static(path.join(__dirname, 'style')));
app.use(express.static(path.join(__dirname, 'style')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/datatables/media/js')))

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use('/news', testRoutes);
app.get('/', function (req, res) {
    res.redirect('login');
})

app.get('/dashboard', auth, function (req, res) {

    News.find(function (err, adminLogins) {
        res.render('dashboard', { data: adminLogins });
    });

})
app.get('/updatenews', auth, function (req, res) {

    res.render('updatenews');
})

app.get('/addnews', function (req, res) {
    res.render('addnews');
})

app.get('/logout', function (req, res) {
    res.cookie('jwt', {expires: Date.now()});
    res.redirect('login');
})

app.get('/login', function (req, res) {

    res.render('login', { error: "" });
})

app.get('/logout', function (req, res) {
    let token = req.cookies.jwt
    jwt.destroy(token);
    res.render('login', { error: "" });
})

app.post('/login', function (req, res) {

    Users.findOne({ "email": req.body.email, "password": req.body.password }, function (err, data) {
        if (data) {
            let email = data.email;

            const token = jwt.sign(
                { user_id: data._id, email },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            data.token = token;
        
            res.cookie("jwt", token, { secure: true });
            res.redirect('/dashboard');

        }
        else {
            res.render('login', { error: "User is not register with us. " });
        }
    })
})

app.get('/signup', function (req, res) {


    res.render('signup', { error: "" });
})



app.post('/signup', function (req, res) {

    try {

        if (req.body.password !== req.body.confirmpassword) {
            return res.render("signup", { error: "password and confirm password should be same." });
        }
        var User = new Users(req.body);

        User.save(function (err) {
            if (err) {
              
                res.status(400).send('Unable to save shark to database');

            }
            else {
                res.redirect("/dashboard");
            }
        });
    }
    catch (err) {
        console.log(err);

    }

})

app.listen(port, (err) => {
    if (err) throw err;
    console.log("server is running on ", port)
})