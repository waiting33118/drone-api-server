const express = require('express')
const router = express.Router()
const apiV1 = require('./v1/api')
const { checkStatus } = require('../controllers')

if (process.env.NODE_ENV === 'development') {
  const swaggerUI = require('swagger-ui-express')
  const { spec } = require('../config')
  router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(spec, { explorer: true }))
}

router.get('/', checkStatus)
router.use('/api/v1', apiV1)

module.exports.routes = router
