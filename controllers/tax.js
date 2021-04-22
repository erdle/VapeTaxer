const Router = require('koa-router');
const cors = require('@koa/cors');
const router = new Router();
const TaxRate = require("../models/TaxRate")
const Checkout = require("../models/Checkout")
const Shop = require("../models/Shop")

const TAX_PRODUCT_HANDLE = 'excise_tax'

router.post(`/webhook`, async (ctx) => {
    const order = ctx.request.body
    //TODO filter tax products
    //TODO delete tax products
    ctx.status = 200;
    ctx.body = { yaay: "ok" };
})

router.get(`/addwebhook/:shop_name`, async (ctx) => {

    const { shop_name } = ctx.params;

    const shop = await Shop.findOne({ name: shop_name })

    const { name, accessToken } = shop

    const webhook = {
        "topic": "orders/create",
        "address": "https://8715b1e68be9.ngrok.io/api/tax/webhook",
        "format": "json"
    }

    try {
        const create_webhook_request = await (await fetch(`https://${name}/admin/api/2021-04/webhooks.json`, {
            method: 'POST',
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ webhook })
        })).json()
        ctx.status = 200;
        ctx.body = { yaay: "ok" };
    }
    catch (e) {
        ctx.status = 500;
        ctx.body = e;
    }
})
router.get(`/test/:id`, cors(), async (ctx) => {
    ctx.status = 200;
    ctx.body = { yaay: "ok" };
})

router.get(`/addtaxes/:shop_name/:id`, cors(), async (ctx) => {
    ///TODO add api key for shop
    const { id, shop_name } = ctx.params;

    const shop = await Shop.findOne({ name: shop_name })

    const { name, accessToken } = shop

    try {

        const checkout_data = await Checkout.findOne({ token: id })

        const checkout_request = await (await fetch(`https://${name}/admin/api/2021-04/checkouts/${id}.json`, {
            method: 'GET',
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'content-type': 'application/json'
            }
        })).json()

        if (checkout_request.errors) {
            ctx.status = 500;
            ctx.body = checkout_request.errors;
            return
        }

        if (checkout_data && checkout_data.updated_at && checkout_data.updated_at.getTime() == new Date(checkout_request.checkout.updated_at).getTime()) {
            ctx.status = 304;
            ctx.body = { yaay: "ok" };
            return
        }

        const all_line_items = checkout_request.checkout.line_items;


        const existing_line_items = all_line_items.filter(line_item => line_item.vendor != "ENDS_taxer").map(line_item => { return { variant_id: line_item.variant_id, quantity: line_item.quantity } })
        const tax_line_item = await getTaxLineItem(checkout_request.checkout, shop)
        const line_items_with_tax = [
            tax_line_item,
            ...existing_line_items,
        ]

        const update_checkout_request = await (await fetch(`https://${name}/admin/api/2021-04/checkouts/${id}.json`, {
            method: 'PUT',
            headers: {
                'X-Shopify-Access-Token': shop.accessToken,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                checkout: {
                    "line_items": line_items_with_tax
                }
            })
        })).json()

        if (update_checkout_request.errors) {
            ctx.status = 500;
            ctx.body = update_checkout_request.errors;
            return
        }

        await Checkout.findOneAndUpdate(
            { token: id },
            {
                $set: {
                    token: checkout_request.checkout.token,
                    shop: name,
                    updated_at: new Date(update_checkout_request.checkout.updated_at)
                }
            },
            { upsert: true }).exec();

        ctx.status = 200;
        ctx.body = { updated_at: update_checkout_request.checkout.updated_at };
    }
    catch (e) {
        ctx.status = 500;
        ctx.body = e;
    }

})

async function calculateTotalTax(checkout, state, shop) {

    const line_items = checkout.line_items;

    const tax_rates = await TaxRate.find({ "state.shortcode": state, shop: shop.name })

    let total_tax = 0
    for (const line_item of line_items) {
        total_tax += await calcLineTaxes(line_item, tax_rates, shop)
    }

    return total_tax;
}

async function calcLineTaxes(line_item, tax_rates, shop) {

    const product_request = await (await fetch(`https://${shop.name}/admin/api/2021-04/products/${line_item.product_id}.json`, {
        method: 'GET',
        headers: {
            'X-Shopify-Access-Token': shop.accessToken,
            'content-type': 'application/json'
        }
    })).json()

    if (product_request.errors) {
        console.log(product_request.errors)
        throw product_request.errors
    }

    const product = product_request.product
    let tax = 0;
    for (const state_tax of tax_rates) {
        if (product.tags.indexOf(state_tax.tax.tag) > -1) {
            const variant = product.variants.find(variant => variant.id == line_item.variant_id)
            const tax_value = await calcConcreteTax(state_tax, variant, shop)
            tax += line_item.quantity * tax_value;
        }
    }

    return tax;
}

async function calcConcreteTax(state_tax, variant, shop) {
    //TODO add per ML logic
    switch (state_tax.taxType) {
        case 'cost_percent': {
            const inventory_item_request = await (await fetch(`https://${shop.name}/admin/api/2021-04/inventory_items/${variant.inventory_item_id}.json`, {
                method: 'GET',
                headers: {
                    'X-Shopify-Access-Token': shop.accessToken,
                    'content-type': 'application/json'
                }
            })).json()
            if (inventory_item_request.errors) {
                console.log(inventory_item_request.errors)
                throw inventory_item_request.errors
            }
            const { inventory_item } = inventory_item_request
            const tax_value = Number(inventory_item.cost) * state_tax.value
            return tax_value;
        }
        case 'price_percent': {
            const tax_value = Number(variant.price) * state_tax.value
            return tax_value
        }
        case 'item_fixed': {
            return state_tax.value
        }
        case 'ml_fixed': {
            //TODO get ML
            return state_tax.value
        }
    }
}

async function getTaxLineItem(checkout, shop) {

    const total_tax = await calculateTotalTax(checkout, "CA", shop)
    const tax_product = (await getTaxProduct(shop)) || (await createTaxProduct(shop));
    const variant_id = tax_product && tax_product.variants && tax_product.variants[0] && tax_product.variants[0].id;

    return {
        variant_id: variant_id,
        properties: { 'cost_percent': 1000 },
        quantity: 1
    };
}

async function getTaxProduct(shop) {
    const tax_product_request = await (await fetch(`https://${shop.name}/admin/api/2021-04/products.json?handle=${TAX_PRODUCT_HANDLE}`, {
        method: 'GET',
        headers: {
            'X-Shopify-Access-Token': shop.accessToken,
            'content-type': 'application/json'
        }
    })).json()
    if (tax_product_request.errors) {
        throw tax_product_request.errors
    }
    const tax_product = tax_product_request.products && tax_product_request.products.length > 0 && tax_product_request.products[0];
    return tax_product;
}

async function createTaxProduct(shop) {
    const new_tax_product_data = {
        product: {
            "title": `Tax product`,
            "handle": TAX_PRODUCT_HANDLE,
            "vendor": "ENDS_taxer",
            "product_type": "ENDS_tax",
            "tags": "tax_product",
            "variants": [{
                "option1": "Tax",
                "price": 1000000,
                "inventory_management": "shopify",
                "inventory_policy": "continue",
                "taxable": false
            }]
        }
    };

    const new_tax_product_request = await (await fetch(`https://${shop.name}/admin/api/2021-04/products.json`, {
        method: 'POST',
        headers: {
            'X-Shopify-Access-Token': shop.accessToken,
            'content-type': 'application/json'
        },
        body: JSON.stringify(new_tax_product_data)
    })).json()
    if (new_tax_product_request.errors) {
        throw new_tax_product_request.errors
    }
    return new_tax_product_request.product
}

module.exports = router
