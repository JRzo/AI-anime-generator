const express = require('express')
const router = express.Router()
const genAI = require('../controllers/GenAIControllers')

router.post('/gen', genAI.genAI)

module.exports = router