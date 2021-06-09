const fetch = require('node-fetch');
const https = require('https');
const { asyncForEach } = require('../utils/asyncHelper');
const { parseLinkHeader } = require('../utils/linkParser');
const { getUnitfromString } = require("../utils/unitHelper")

const httpsAgent = new https.Agent({
    keepAlive: true
});

const getOrders = async function (shop, accessToken, page_size = 10, url = `https://${shop}/admin/orders.json?limit=${page_size}`) {
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
    const orders = data.orders;

    const link_string = request.headers.get('link')
    const links = link_string && parseLinkHeader(link_string)
    const { next, previous } = links || {}

    if (!(next && next["href"]))
        return { orders, pagination: { next, previous } };
}
module.exports = { getOrders }