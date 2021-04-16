const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StateTax = new Schema({
    tax: { name: String, tag: String },
    state: { name: String, shortcode: String },
    shop: String,
    taxType: String,
    value: Number,
});

StateTax.index({ "tax.tag": 1, 'state.shortcode': 1, shop: 1 }, { unique: true })
module.exports = mongoose.model('StateTax', StateTax);