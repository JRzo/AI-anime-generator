const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("login.ejs", {
    title: "Login",
  });
};

exports.postLogin = async (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = await validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect("/");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignup = async (req, res, next) => {
  console.log(req.body)
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  try{
      let userExisting = await User.findOne({$or: [{email: req.body.email}]})

      if(userExisting){
        req.flash("errors", {msg: "Account with that email address exist"});
        return res.redirect('/signup')
      }

      await user.save();

      req.logIn(user, (err) =>{
        if(err){
          console.log("Error loggin in user after signup", err)
          return next(err)
        }
      })

      res.redirect('/')
  }
  catch(err){
    res.status(200).json({message: 'An error has occured!'})
  }
  // save the user



};
