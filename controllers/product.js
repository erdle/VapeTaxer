const Router = require('koa-router');
const router = new Router();
const { getAllProductsAndSave } = require("../services/shopifyProducts")
const ProductDetails = require("../models/ProductDetails")
const VariantDetails = require("../models/VariantDetails")

router.get(`/validate/:id`, async (ctx) => {
    const { shop } = ctx.session;
    const { id } = ctx.params;
    const product = await ProductDetails.populate('variants').find({ shop, _id: id })
    const shopify_variants = 
    ctx.status = 200;
    ctx.body = { data: products, count: count };
})


router.get(`/:page/:page_size/:sort`, async (ctx) => {
    const { shop } = ctx.session;
    const { page, sort, page_size } = ctx.params;
    const count = await ProductDetails.find({ shop }).count()
    const products = await ProductDetails.find({ shop }).populate('variants').skip(page * page_size).limit(page_size * 1).sort({ [`${sort || 'state.name'}`]: -1 });
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
    const product_data = await await ProductDetails.find({ shop: "test.com" }).populate("variants")
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