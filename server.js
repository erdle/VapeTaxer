require('dotenv').config()
const Koa = require('koa');

const jwt = require('koa-jwt');
const Router = require('koa-router');
const session = require('koa-session');
const { default: shopifyAuth } = require('@shopify/koa-shopify-auth');
const verifyRequest = require('@shopify/koa-shopify-auth').verifyRequest;
const mount = require('koa-mount')
const serve = require('koa-static');

global.fetch = require("node-fetch");
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const bodyParser = require('koa-bodyparser');
const fs = require('fs')

const port = process.env.PORT || 5000;
const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, MONGO_CONNECTION } = process.env;

const app = new Koa();
const router = new Router();

const TaxRate = require("./models/TaxRate")
const Shop = require("./models/Shop")

const tax = require("./controllers/tax")
const taxRateApi = require("./controllers/taxRate")

router
  .get('/install', (ctx, next) => {
    ctx.body = 'Hi there your session has expired, please go to shopify to login install!';
  })

app.keys = [SHOPIFY_API_SECRET];
app.use(bodyParser())
app.use(router.routes())
  .use(router.allowedMethods())

// .use(async (ctx, next) => {
//   ctx.session = { shop: "babstest.myshopify.com" }
//   try {
//     await next();
//   } catch (err) {
//     ctx.status = err.status || 500;
//     ctx.body = err.message;
//     ctx.app.emit('error', err, ctx);
//   }
// })

app.use(mount('/api/tax', tax.middleware()))

app
  // sets up secure session data on each request
  .use(session({ secure: true, sameSite: 'none' }, app))
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  })
  .use(
    shopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET,
      scopes: ['write_products', 'write_inventory', 'write_orders', 'write_checkouts', 'read_product_listings', 'unauthenticated_read_product_listings'],

      accessMode: 'offline',
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        
        const { orgin } = ctx.request
        await Shop.findOneAndUpdate(
          { name: shop },
          {
            $set: {
              accessToken: accessToken,
              name: shop,
            }
          },
          { upsert: true }).exec();


        // const webhook = {
        //   "topic": "orders/create",
        //   "address": `${orgin}/api/tax/webhook`,
        //   "format": "json"
        // }

        // const create_webhook_request = await (await fetch(`https://${shop}/admin/api/2021-04/webhooks.json`, {
        //   method: 'POST',
        //   headers: {
        //     'X-Shopify-Access-Token': accessToken,
        //     'content-type': 'application/json'
        //   },
        //   body: JSON.stringify({ webhook })
        // })).json()


        return ctx.redirect('/');
      },
    }),
  )
  // everything after this point will require authentication
  .use(verifyRequest({ fallbackRoute: '/install', authRoute: '/auth', }))

  app.use(mount('/api/taxrates', taxRateApi.middleware()))

app.on('error', (err, ctx) => {
  console.log('error', err);
  ctx.status = err.status || 500;
  ctx.body = {
    message: err.message,
    error: err
  }
})

mongoose.connect(MONGO_CONNECTION, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async function () {

  const taxRate = await TaxRate.findOne({})
  if (!taxRate) {
    await TaxRate.insertMany([
      {
        tax: { name: "e-liquid", tag: "taxable_eliquid", shop: "babstest.myshopify.com" },
        state: { name: "California", shortcode: "CA" },
        shop: "babstest.myshopify.com",
        //TODO global taxType Enum
        taxType: "cost_percent",
        value: 57.5,
      }
    ])
  }

  console.log("mongoose connected")
})

const REACT_ROUTER_PATHS = [
  '/dashboard'
];

app
  .use(async (ctx, next) => {
    if (ctx.request.path.indexOf("/dashboard") != -1) {
      ctx.request.path = '/';
    }
    await next()
  })
  .use(serve('build'))

app.listen(port, () => console.log(`running on port ${port}`))