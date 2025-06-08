const express = require('express')
const router = express.Router()
const genAI = require('../controllers/GenAIControllers')

router.post('/gen', genAI.genAI)
router.get("/aiGen", genAI.aigenTemplate )

module.exports = router