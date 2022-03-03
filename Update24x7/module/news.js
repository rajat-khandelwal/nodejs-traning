const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema ({
      
        title: { type: String, required: true  , unique:true},
        description: { type: String, required: true },
        imageurl: { type: String, required: true },
        createdDate: { type: Date, required: true,default:new Date() }
}, 
{collection:"news"} );

module.exports = mongoose.model('news', newsSchema)