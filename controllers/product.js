const Router = require('koa-router');
const router = new Router();
const { getAllProductsAndSave, SyncProductVariantsDetails } = require("../services/shopifyProducts")
const ProductDetails = require("../models/ProductDetails")
const VariantDetails = require("../models/VariantDetails")
const { asyncForEach } = require('../utils/asyncHelper');

router.get(`/sync_and_get/:id`, async (ctx) => {
    const { shop, accessToken } = ctx.session;
    const { id } = ctx.params;
    const productDetails = await SyncProductVariantsDetails(shop, accessToken, id)

    const next_not_approved_product = await ProductDetails.find({ _id: { $gt: id }, shop }).sort({ _id: 1 }).limit(1)
    const previous_not_approved_product = await ProductDetails.find({ _id: { $lt: id }, shop }).sort({ _id: -1 }).limit(1)

    const next_id = next_not_approved_product[0] && next_not_approved_product[0]._id;
    const previous_id = previous_not_approved_product[0] && previous_not_approved_product[0]._id;

    ctx.status = 200;
    ctx.body = { data: productDetails, next_id, previous_id };
})

router.post(`/approve/:id`, async (ctx) => {
    const { shop, accessToken } = ctx.session;
    const { id } = ctx.params;
    const data = ctx.request.body;
    const productDetails = await ProductDetails.findOne({ shop, _id: id }).populate('variants')

    await asyncForEach(productDetails.variants, async (variant) => {
        const variant_calculations = data.variants.find(v => v._id == variant._id)

        variant.capacity = variant_calculations.capacity;
        variant.contains_nicotine = variant_calculations.contains_nicotine;
        variant.items_count = variant_calculations.items_count;
        await variant.save()
    })
    productDetails.approved = true;
    productDetails.save();

    ctx.status = 200;
    ctx.body = { data: productDetails };
})

router.get(`/:page/:page_size/:sort`, async (ctx) => {
    const { shop } = ctx.session;
    const { page, sort, page_size } = ctx.params;
    const count = await ProductDetails.find({ shop }).countDocuments()
    const products = await ProductDetails.find({ shop }).skip(page * page_size).limit(page_size * 1).sort({ [`${sort || 'state.name'}`]: -1 }).populate('variants');
    ctx.status = 200;
    ctx.body = { data: products, count: count };
})

router.get(`/pending/:page/:page_size/:sort`, async (ctx) => {
    const { shop } = ctx.session;
    const { page, sort, page_size } = ctx.params;
    const count = await ProductDetails.find({ shop, approved: { $ne: true } }).countDocuments()
    const products = await ProductDetails.find({ shop, approved: { $ne: true } }).skip(page * page_size).limit(page_size * 1).sort({ [`${sort || 'state.name'}`]: -1 }).populate('variants');
    ctx.status = 200;
    ctx.body = { data: products, count: count };
})

router.get(`/approved/:page/:page_size/:sort`, async (ctx) => {
    const { shop } = ctx.session;
    const { page, sort, page_size } = ctx.params;
    const count = await ProductDetails.find({ shop, approved: true }).countDocuments()
    const products = await ProductDetails.find({ shop, approved: true }).skip(page * page_size).limit(page_size * 1).sort({ [`${sort || 'state.name'}`]: -1 }).populate('variants');
    ctx.status = 200;
    ctx.body = { data: products, count: count };
})

router.get(`/sync_all`, async (ctx) => {
    const { shop, accessToken } = ctx.session;
    try {
        await getAllProductsAndSave(shop, accessToken)

        ctx.status = 200;
        ctx.body = { yaay: "ok" };
    }
    catch (e) {
        //TODO handle log
        console.log(e)
        ctx.status = 500;
        ctx.body = { error: e };
    }

})

router.get(`/get_test`, async (ctx) => {
    const { shop, accessToken } = ctx.session;
    const product_data = await ProductDetails.findOne({ shop: "test.com" }).populate("variants")
    ctx.status = 200;
    ctx.body = product_data;
})

router.get(`/not_validated`, async (ctx) => {
    const { shop, accessToken } = ctx.session;

    try {
        await getAllProductsAndSave(shop, accessToken)
        ctx.status = 200;
        ctx.body = { yaay: "ok" }
    }
    catch (e) {
        //TODO handle log
        console.log(e)
    }

})





module.exports = router