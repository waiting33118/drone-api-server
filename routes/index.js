const express = require('express')
const swaggerUI = require('swagger-ui-express')
const router = express.Router()
const apiV1 = require('./v1/api')
const { spec } = require('../config/swaggerJsdoc')

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(spec, { explorer: true }))
router.use('/api/v1', apiV1)

module.exports = router
