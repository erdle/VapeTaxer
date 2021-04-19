const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaxRate = new Schema({
    tax: { name: String, tag: String },
    state: { name: String, shortcode: String },
    shop: String,
    taxType: String,
    value: Number,
});

TaxRate.index({ "tax.tag": 1, 'state.shortcode': 1, shop: 1 }, { unique: true })
module.exports = mongoose.model('TaxRate', TaxRate);