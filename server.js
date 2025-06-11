const express = require('express')
const bodyparse = require('body-parser')
const mongoose = require('mongoose')
const ejs = require('ejs')
const passport = require("passport");
// The app starter

const app = express()
const flash = require("flash")
// We will connect the database with the file
const connectDB = require('./config/database')
const session = require('express-session')
const MongoStore = require("connect-mongo")( session);
const logger = require('morgan')

// Routes
const mainRoutes = require("./routes/main")
const apiGenAIRoutes = require('./routes/apiGenAI')
require("dotenv").config({ path: "./config/.env" });
require('./config/passport')(passport)
connectDB()

app.use(
  session({
    secret: "anime",
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false},
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize()); //persistent login sessions
app.use(passport.session()); // persistent login sessions
app.use(flash()); //use connect-flash for flash messages stored in session


// The middleware
app.set("view engine", "ejs");
app.use(express.static('public'))
// Body parsing
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(logger("dev"));

// the routes

app.use('/', mainRoutes)
app.use('/api', apiGenAIRoutes)

app.listen(process.env.PORT, () => {
    console.log("Up and running")
})