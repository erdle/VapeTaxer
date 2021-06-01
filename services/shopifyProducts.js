const fetch = require('node-fetch');
const https = require('https');
const { asyncForEach } = require('../utils/asyncHelper');
const { parseLinkHeader } = require('../utils/linkParser');
const { getUnitfromString } = require("../utils/unitHelper")

const httpsAgent = new https.Agent({
    keepAlive: true
});

const ProductDetails = require('../models/ProductDetails')
const VariantDetails = require('../models/VariantDetails')

const addProduct = async function (shop, accessToken, product) {
    let request = await fetch(`https://${shop}/admin/products.json?limit=250`,
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

const getAllProductsAndSave = async function (shop, accessToken, url = `https://${shop}/admin/products.json?limit=250`) {

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
    const all_variants = [];

    await asyncForEach(data.products, async (product) => {
        await ProductDetails.update({ shop, shopify_product_id: product.id }, {
            shop,
            shopify_product_id: product.id,
            title: product.title,
            tags: product.tags,
            vendor: product.vendor,
            product_type: product.product_type,
        }, { upsert: true })

    })

    const link_string = request.headers.get('link')
    const links = link_string && parseLinkHeader(link_string)
    const { next } = links || {}

    if (!(next && next["href"]))
        return

    await getAllProductsAndSave(shop, accessToken, next["href"]);

}

async function GetProductVariantsDetails(shop, accessToken, product_id) {



    const variants = product.variants;

    const result = variants.map(variant => {

        const mil_default_value = product.tags.indexOf('PACT-disposable') > -1 ? 1.4 : 60;
        const capacity = getUnitfromString('ml', variant.title) || getUnitfromString('ml', product.title);
        const strength = getUnitfromString('mg', variant.title) || getUnitfromString('mg', product.title);
        const bundle = getUnitfromString('x', variant.title) || getUnitfromString('x', product.title) || 1;
        const packs_count = getUnitfromString('pack of', variant.title) || getUnitfromString('pack of', product.title) || 1;
        const items_count = packs_count * bundle;
        const contains_nicotine = strength > 0;

        const variant_details = new VariantDetails({
            shop,

            shopify_product_id: product.id,
            shopify_variant_id: variant.id,
            shopify_inventory_item_id: variant.inventory_item_id,
            capacity: capacity,
            contains_nicotine: contains_nicotine,
            items_count: items_count,

            variant_price: Number(variant.price),

            weight: variant.weight,
            weight_unit: variant.weight_unit,
            barcode: variant.barcode,
            last_update: variant.updated_at

        })
        return variant_details

    })

    return result;
}

async function GetProductVariants(shop, accessToken, product) {
    const url = `https://${shop}/admin/products/${product.id}/variants.json`
    const request = await fetch(url,
        {
            method: 'GET',
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'content-type': 'application/json'
            },
            agent: httpsAgent
        });
    if (request.status == 429) {
        await sleep(1000)
        return await GetProductDetails(shop, accessToken, product)
    }
    const data = (await request.json());
    return data && data.variants
}

async function GetInventoryItems(shop, accessToken, ids) {
    const url = `https://${shop}/admin/api/2021-04/inventory_items.json?ids=${ids.join(',')}`
    const request = await fetch(url,
        {
            method: 'GET',
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'content-type': 'application/json'
            },
            agent: httpsAgent
        });
    if (request.status == 429) {
        await sleep(1000)
        return await GetProductDetails(shop, accessToken, product)
    }
    const data = (await request.json());
    return data && data.inventory_items

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




async function getAllProductsTargetKeyword(shop, accessToken, url = `https://${shop}/admin/products.json?limit=250`) {
    if (!window.result)
        window.result = []
    let request = await fetch(url,
        {
            method: 'GET',
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'content-type': 'application/json'
            },
        });

    const data = (await request.json());

    await asyncForEach(data.products, async (product) => {
        try {
            const target_metafields = await getProductMetafields(shop, accessToken, product.id)
            const seo_manager_config_metafield = target_metafields.find(metafield => metafield.namespace === "SEOMetaManager" && metafield.key === "config")
            const seo_magager_config_value_json = JSON.parse(seo_manager_config_metafield.value)
            const focusKeyword = seo_magager_config_value_json["focusKeyword"]
            window.result.push({
                title: product.title,
                handle: product.handle,
                target_keyword: focusKeyword
            })
        }
        catch (e) {
            console.log(`${product.id} --- error ${e}`)
        }

    })

    const link_string = request.headers.get('link')
    const links = link_string && parseLinkHeader(link_string)
    const { next } = links || {}

    if (!(next && next["href"]))
        return

    const next_page_data = await getAllProducts(shop, accessToken, next["href"]);
    return
}

async function getProductMetafields(shop, accessToken, product_id) {
    const url = `https://${shop}/admin/products/${product_id}/metafields.json`
    const request = await fetch(url,
        {
            method: 'GET',
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'content-type': 'application/json'
            },
        });
    if (request.status != 200) {
        await sleep(1000)
        return await getProductMetafields(shop, accessToken, product_id)
    }
    const data = (await request.json());
    return data.metafields;
}

module.exports = { getAllProductsAndSave, addProduct }