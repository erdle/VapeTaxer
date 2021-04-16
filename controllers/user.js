const Router = require('koa-router');
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/User")
const router = new Router();

router.post('/register', async (ctx) => {
  const userData = { ...(new User()), ...ctx.request.body, username: ctx.request.body.email };
  const user = await User.create(userData) //new User(ctx.request.body);
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      ctx.body = { status: 'done' };
    } else {
      ctx.status = 400;
      ctx.body = { status: err };
    }
  })(ctx);
});

router.post('/asd', async (ctx) => {
  ctx.body = "asd";
});

router.post('/login', async (ctx) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      ctx.body = "hurrey";
    } else {
      ctx.status = 400;
      ctx.body = { status: err };
    }
  })(ctx);
});


router.get('/hi', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.body = "hi there you are authenticated";
  } else {
    ctx.status = 401;
    ctx.body = "oops, not authorized, please log in to get hi";
  }
});

router.get('/logout', async (ctx) => {
  if (helpers.ensureAuthenticated(ctx)) {
    ctx.logout();
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});


router.get('/', (ctx, next) => {
  ctx.body = "hi there asd"
});

module.exports = router