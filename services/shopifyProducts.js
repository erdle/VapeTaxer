const fetch = require('node-fetch');
const https = require('https');
const { asyncForEach } = require('../utils/asyncHelper');
const { parseLinkHeader } = require('../utils/linkParser');
const httpsAgent = new https.Agent({
    keepAlive: true
});

const Product = require('../models/Product')
const ProductType = require('../models/ProductType')
const Vendor = require('../models/Vendor')
const Tag = require('../models/Tag')

const Option = require('../models/Option')

const addProduct = async function (shop, accessToken, product) {
    let request = await fetch(`https://${shop}/admin/products.json`,
        {
            method: 'POST',
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ product }),
            agent: httpsAgent
        });
    const data = (await request.json());
    return data;
}


const getAllProductsAndSave = async function (shop, accessToken, url = `https://${shop}/admin/products.json`) {

    let request = await fetch(url,
        {
            method: 'GET',
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'content-type': 'application/json'
            },
            agent: httpsAgent
        });
    const data = (await request.json());

    // sync products
    await asyncForEach(data.products, async (product) => {
        if (product.vendor && product.vendor.length > 0)
            await Vendor.findOneAndUpdate(
                { name: product.vendor, shop },
                { $set: { name: product.vendor, shop } },
                { upsert: true, new: true }).exec();

        if (product.product_type && product.product_type.length > 0)
            await ProductType.findOneAndUpdate(
                { name: product.product_type, shop },
                { $set: { name: product.product_type, shop } },
                { upsert: true, new: true }).exec();

        await asyncForEach(product.options, async (option) => {
            if (option.name == "Title")
                return

            await Option.findOneAndUpdate(
                { name: option.name, shop },
                { $set: { name: option.name, values: option.values, shop } },
                { upsert: true, new: true }).exec();
        })

        await Product.findOneAndUpdate(
            { shopify_id: product.id, shop },
            { $set: { shopify_id: product.id, shop, ...product } },
            { upsert: true, new: true }).exec();
    })

    const link_string = request.headers.get('link')
    const links = link_string && parseLinkHeader(link_string)
    const { next } = links || {}

    if (next && next["href"]) {
        const next_items = await getAllProductsAndSave(shop, accessToken, next["href"])
        const result = [...data.products, ...next_items]
        return result
    }
    else
        return [...data.products];
}

module.exports = { getAllProductsAndSave, addProduct }