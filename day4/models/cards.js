const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cards = new Schema ({
        name: { type: String, required: true },
        address: { type: String, required: true },
        email: { type: String, required: true },
        shopingItem: { type: [], required: true },
        createdDate: { type: Date, required: true,default:new Date() }
});

module.exports = mongoose.model('cards', cards)