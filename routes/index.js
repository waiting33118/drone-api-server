const express = require('express')
const droneControl = require('./v1/droneControl')
const router = express.Router()

router.use('/api/v1', droneControl)

module.exports = router
