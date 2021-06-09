const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductDetails = new Schema({

    shop: { type: String, required: true },

    created: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('ProductDetails', ProductDetails);