const fetch = require('node-fetch');
const https = require('https');
const { asyncForEach } = require('../utils/asyncHelper');

const httpsAgent = new https.Agent({
    keepAlive: true
});


const Collection = require('../models/Collection')

const getCollectionsAndSave = async function (shop, accessToken, data_key, url) {

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
    if (!request.ok)
        throw data.errors
    const collections = data[data_key];

    await asyncForEach(collections, async (collection) => {
        await Collection.findOneAndUpdate(
            { shopify_id: collection.id, shop },
            { $set: { shopify_id: collection.id, smart: false, shop, ...collection } },
            { upsert: true, new: true }).exec();

    })

    const link_string = request.headers.get('link')
    const links = link_string && parseLinkHeader(link_string)
    const { next } = links || {}

    if (next && next["href"]) {
        const next_items = await getCollectionsAndSave(shop, accessToken, data_key, next["href"])
        const result = [...collections, ...next_items]
        return result
    }
    else
        return [...collections];
}


const getCustomCollectionsAndSave = async function (shop, accessToken) {
    return await getCollectionsAndSave(shop, accessToken, 'custom_collections', `https://${shop}/admin/custom_collections.json`)
}

const getSmartCollectionsAndSave = async function (shop, accessToken) {
    return await getCollectionsAndSave(shop, accessToken, 'smart_collections', `https://${shop}/admin/smart_collections.json`)
}



module.exports = { getSmartCollectionsAndSave, getCustomCollectionsAndSave }