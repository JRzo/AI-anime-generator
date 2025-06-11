const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController')
const mainController = require("../controllers/mainController.js")
const profileControllers = require('../controllers/auth.js')

// We don't need to login or ensure loggedin


router.get('/', homeController.getIndex);
router.get("/login", profileControllers.getLogin);
router.post("/login", profileControllers.postLogin);
router.get("/logout", profileControllers.logout);
router.get("/signup", profileControllers.getSignup);
router.post("/signup", profileControllers.postSignup);
router.get('/settings', mainController.getSettings);

// Sites for anime
router.get('/sites',  mainController.getSites)

// the historyu site
router.get('/history', mainController.getHistory)

module.exports =  router