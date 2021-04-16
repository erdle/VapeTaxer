const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tax = new Schema({
    name: String,
    shop: String,
    tag: String
});

module.exports = mongoose.model('Tax', Tax);