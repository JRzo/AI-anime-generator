const express = require('express')
const bodyparse = require('body-parser')
const mongoose = require('mongoose')
const ejs = require('ejs')
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

connectDB()



// The middleware
app.set("view engine", "ejs");
app.use(express.static('public'))
// Body parsing
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(logger("dev"));

app.use(
  session({
    secret: "anime",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//Use flash messages for errors, info, ect...
app.use(flash());

// the routes

app.use('/', mainRoutes)
app.use('/api', apiGenAIRoutes)

app.listen(process.env.PORT, () => {
    console.log("Up and running")
})