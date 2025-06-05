const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController')
const mainController = require("../controllers/mainController.js")

// We don't need to login or ensure loggedin


router.get('/', homeController.getIndex);
router.get('/settings', mainController.getSettings)

module.exports =  router