const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductDetails = new Schema({

    shop: { type: String, required: true },
    title: { type: String, required: true },
    vendor: String,
    product_type: String,
    shopify_product_id: { type: String, required: true },

    tags: String,

    created: {
        type: Date,
        default: Date.now
    },

    variants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "VariantDetails",
        default: []
    }],
    approved: { type: Boolean, default: false },

});

module.exports = mongoose.model('ProductDetails', ProductDetails);