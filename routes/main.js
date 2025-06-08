const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController')
const mainController = require("../controllers/mainController.js")
const profileControllers = require('../controllers/profileControllers')

// We don't need to login or ensure loggedin


router.get('/', homeController.getIndex);
router.get('/login', profileControllers.getLogin);
router.get('/signup', profileControllers.getSignUp)
router.get('/settings', mainController.getSettings);

module.exports =  router