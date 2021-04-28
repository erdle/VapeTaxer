const Router = require('koa-router');
const router = new Router();
const TaxRate = require('../models/TaxRate')

router.get(`/:page/:page_size/:sort`, async (ctx) => {
    const { shop } = ctx.session;
    const { page, sort, page_size } = ctx.params;
    const count = await TaxRate.find({ shop }).count()
    const tax_rates = await TaxRate.find({ shop }).skip(page * page_size).limit(page_size * 1).sort({ [`${sort || 'state.name'}`]: -1 });
    ctx.status = 200;
    ctx.body = { data: tax_rates, count: count };
})

router.post('/', async (ctx) => {
    const { shop } = ctx.session;
    try {
        const data = ctx.request.body;

        const tax_rate = {
            tax: { name: data.tax_name, tag: data.tax_tag },
            state: { name: data.state_name, shortcode: data.state_shortcode },
            shop: shop,
            taxType: data.taxType,
            value: data.value,
        }
        
        if (data.bound_unit)
            tax_rate.bound = {
                unit: data.bound_unit, min: data.bound_min, max: data.bound_max
            }

        let new_data = await TaxRate.create(tax_rate);
        ctx.status = 201;
        ctx.body = new_data;
    }
    catch (err) {
        ctx.status = 500;
        ctx.body = { error: err.message };
    }
});

router.put('/:id', async (ctx) => {
    const { shop } = ctx.session;
    const { id } = ctx.params;
    const new_data = ctx.request.body;
    const tax_rate = await TaxRate.findOneAndUpdate({ _id: id, shop }, new_data, { new: true })
    if (!tax_rate) {
        ctx.status = 404;
        ctx.body = {};
        return
    }
    ctx.status = 200;
    ctx.body = tax_rate;
});

router.delete('/:id', async (ctx) => {
    const { shop } = ctx.session;
    const { id } = ctx.params;
    const tax_rate = await TaxRate.findOne({ _id: id, shop })
    if (!tax_rate) {
        ctx.status = 404;
        ctx.body = {};
        return
    }
    await tax_rate.remove()
    ctx.status = 200;
    ctx.body = {};
});


module.exports = router