
const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/User")

const options = {};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(options, (username, password, done) => {
  User.findOne({ username }).select('+hashedPassword')
    .then((user) => {
      if (!user) return done(null, false);
      if (!user.checkPassword(password)) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
    .catch((err) => { 
      return done(err); 
    });
}))