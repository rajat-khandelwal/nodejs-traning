const mongoose = require('mongoose');

// const MONGO_USERNAME = 'sammy';
// const MONGO_PASSWORD = 'password';
// const MONGO_HOSTNAME = '127.0.0.1';
// const MONGO_PORT = '27017';
// const MONGO_DB = 'sharkinfo';

const url ="mongodb://localhost:27017/Akamai";

mongoose.connect(url, {useNewUrlParser: true});