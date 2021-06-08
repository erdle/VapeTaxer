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
        await ProductDetails.updateOne({ shop, shopify_product_id: product.id }, {
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

//TODO refactor this shit
async function SyncProductVariantsDetails(shop, accessToken, product_id) {

    const productDetails = await ProductDetails.findOne({ shop, _id: product_id }).populate('variants')
    const url = `https://${shop}/admin/products/${productDetails.shopify_product_id}.json`
    const request = await fetch(url,
        {
            method: 'GET',
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'content-type': 'application/json'
            },
            agent: httpsAgent
        });

    const data = (await request.json());
    const shopify_product = data.product;

    const shopify_variants = shopify_product.variants;
    const variant_ids = [];

    await asyncForEach(shopify_variants, async (shopify_variant) => {
        const db_variant_details = productDetails.variants && productDetails.variants.find(v => v.shopify_variant_id == shopify_variant.id)
        if (!db_variant_details || new Date(shopify_variant.updated_at) > db_variant_details.last_update) {

            const mil_default_value = shopify_product.tags.indexOf('PACT-disposable') > -1 ? 1.4 : 60;
            const capacity = getUnitfromString('ml', shopify_variant.title) || getUnitfromString('ml', shopify_product.title);
            const strength = getUnitfromString('mg', shopify_variant.title) || getUnitfromString('mg', shopify_product.title);
            const bundle = getUnitfromString('x', shopify_variant.title) || getUnitfromString('x', shopify_product.title) || 1;
            const packs_count = getUnitfromString('pack of', shopify_variant.title) || getUnitfromString('pack of', shopify_product.title) || 1;
            const items_count = packs_count * bundle;
            const contains_nicotine = strength > 0;

            const image = shopify_product.images.find(img => img.variant_ids.some(id => id === shopify_variant.id))
            const image_src = image && image.src;
            const variant_details = await VariantDetails.findOneAndUpdate({ shop, shopify_variant_id: shopify_variant.id }, {
                shop,
                product: productDetails,
                title: shopify_variant.title,
                shopify_variant_id: shopify_variant.id,
                shopify_inventory_item_id: shopify_variant.inventory_item_id,
                variant_price: Number(shopify_variant.price),
                weight: shopify_variant.weight,
                weight_unit: shopify_variant.weight_unit,
                barcode: shopify_variant.barcode,
                last_update: shopify_variant.updated_at,
                image_src,
                capacity: capacity,
                contains_nicotine: contains_nicotine,
                items_count: items_count

            }, { upsert: true, new: true })

            variant_ids.push(variant_details._id);
        }
        else {
            variant_ids.push(db_variant_details._id);
        }
    })

    const final_product_data = await ProductDetails.findOneAndUpdate({ shop, _id: product_id }, {
        shop,
        shopify_product_id: shopify_product.id,
        title: shopify_product.title,
        tags: shopify_product.tags,
        vendor: shopify_product.vendor,
        product_type: shopify_product.product_type,
        variants: variant_ids
    }, { upsert: true, new: true }).populate('variants')


    return final_product_data;

}


function newVariantDetails(shop, product, shopify_variant) {
    const mil_default_value = product.tags.indexOf('PACT-disposable') > -1 ? 1.4 : 60;
    const capacity = getUnitfromString('ml', shopify_variant.title) || getUnitfromString('ml', product.title);
    const strength = getUnitfromString('mg', shopify_variant.title) || getUnitfromString('mg', product.title);
    const bundle = getUnitfromString('x', shopify_variant.title) || getUnitfromString('x', product.title) || 1;
    const packs_count = getUnitfromString('pack of', shopify_variant.title) || getUnitfromString('pack of', product.title) || 1;
    const items_count = packs_count * bundle;
    const contains_nicotine = strength > 0;

    const variant_details = new VariantDetails({

        shop,

        shopify_product_id: product.id,
        shopify_variant_id: shopify_variant.id,

        title: shopify_variant.title,
        shopify_inventory_item_id: shopify_variant.inventory_item_id,
        variant_price: Number(shopify_variant.price),
        weight: shopify_variant.weight,
        weight_unit: shopify_variant.weight_unit,
        barcode: shopify_variant.barcode,
        last_update: shopify_variant.updated_at,

        capacity: capacity,
        contains_nicotine: contains_nicotine,
        items_count: items_count,

    })
    return variant_details;
}

function GetProductVariantsDetails(shop, product) {

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

async function GetProductVariants(shop, accessToken, product_id) {
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
        return await GetProductVariants(shop, accessToken, product_id)
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

module.exports = { getAllProductsAndSave, addProduct, SyncProductVariantsDetails }