const express = require('express')
const router = express.Router()
const apiV1 = require('./v1/apis')

router.use('/api/v1', apiV1)

module.exports = router
