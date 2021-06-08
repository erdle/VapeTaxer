const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VariantDetails = new Schema({
    title: { type: String, required: true },
    shop: { type: String, required: true },

    shopify_variant_id: { type: String, required: true },
    shopify_inventory_item_id: { type: String },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductDetails",
    },
    image_src: String,

    capacity: Number,
    contains_nicotine: Boolean,

    items_count: {
        type: Number,
        default: 1
    },
    cost: Number,
    variant_price: Number,

    weight: Number,
    weight_unit: String,
    barcode: String,

    last_update: Date,

    created: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('VariantDetails', VariantDetails);