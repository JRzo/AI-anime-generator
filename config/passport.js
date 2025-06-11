const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {

      try{
        let userExisting = await User.findOne({$or: [{email: email}]})
        if(!userExisting){
          return done(null, false, {msg: `Email ${email} not found`})
        }
        if(!passport){
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        userExisting.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, userExisting);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      }
      catch(err){
        console.log(err)
      }
     
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser( async (id, done) => {
    try{
      let user = await User.findById(id);
      done(null, user)
    }
    catch(err){
      console.log(err)
    }
    // User.findById(id, (err, user) => done(err, user));
  });
};
