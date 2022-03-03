const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
      
        email: { type: String, required: true  , unique:true},
        password: { type: String, required: true },
        createdDate: { type: Date, required: true,default:new Date() }
});

module.exports = mongoose.model('users', userSchema)