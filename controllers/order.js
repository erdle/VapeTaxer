const Router = require('koa-router');
const router = new Router();
const { getOrders } = require("../services/shopifyOrders")
const { asyncForEach } = require('../utils/asyncHelper');

router.get(`/:page_size/:sort`, async (ctx) => {
    const { shop } = ctx.session;
    const { page, sort, page_size } = ctx.params;
    const count = await ProductDetails.find({ shop }).countDocuments()
    const products = await ProductDetails.find({ shop }).skip(page * page_size).limit(page_size * 1).sort({ [`${sort || 'state.name'}`]: -1 }).populate('variants');
    ctx.status = 200;
    ctx.body = { data: products, count: count };
})