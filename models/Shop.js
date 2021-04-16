const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Shop = new Schema({
    accessToken: String,
    name: String,
});

module.exports = mongoose.model('Shop', Shop);

