const fetch = require('node-fetch');
const https = require('https');
const httpsAgent = new https.Agent({
    keepAlive: true
});
const { parseLinkHeader } = require('./linkParser')

const getOrders = async (shop, accessToken, url, state_code) => {
    const request = await fetch(url,
        {
            method: 'GET',
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'content-type': 'application/json'
            },
            agent: httpsAgent
        });
    if (request.errors) {
        console.log(request.errors)
        throw request.errors
    }
    
    const shop_orders = (await request.json())
    const link_string = request.headers.get('link')
    const links = link_string && parseLinkHeader(link_string)
    const { next } = links || {}
    if (next && next["href"]) {
        const next_items = await getOrders(shop, accessToken, next["href"], state_code)
        const result = [...filter_orders_by_state(shop_orders.orders, state_code), ...next_items]
        return result
    }

    else
        return [...filter_orders_by_state(shop_orders.orders, state_code)]
}

const filter_orders_by_state = (orders, state_code) => {
    return orders.filter(order => order["shipping_address"] && order["shipping_address"]["country_code"] === "US" && order["shipping_address"]["province_code"] === state_code)
}

module.exports = { getOrders }