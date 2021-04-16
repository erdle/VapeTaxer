const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const State = new Schema({
    name: String,
    shortcode:String,
});

module.exports = mongoose.model('State', State);

