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

const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET } = process.env;

const app = new Koa();
const router = new Router();

const State = require("./models/State")
const StateTax = require("./models/StateTax")
const Tax = require("./models/Tax")
const Shop = require("./models/Shop")


const tax = require("./controllers/tax")

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
        
        await Shop.findOneAndUpdate(
          { name: shop },
          {
            $set: {
              accessToken: accessToken,
              name: shop,
            }
          },
          { upsert: true }).exec();

        return ctx.redirect('/');
      },
    }),
  )
  // everything after this point will require authentication
  .use(verifyRequest({ fallbackRoute: '/install', authRoute: '/auth', }))




app.on('error', (err, ctx) => {
  console.log('error', err);
  ctx.status = err.status || 500;
  ctx.body = {
    message: err.message,
    error: err
  }
})

mongoose.connect('mongodb://localhost/ends_taxer_db', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async function () {

  const stateTax = await StateTax.findOne({})
  if (!stateTax) {
    await StateTax.insertMany([
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


app.listen(5000, () => console.log('running on port 5000'))