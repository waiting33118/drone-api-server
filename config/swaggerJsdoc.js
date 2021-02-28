const swaggerJsdoc = require('swagger-jsdoc')

module.exports.spec = swaggerJsdoc({
  swaggerDefinition: {
    basePath: '/api/v1',
    swagger: '2.0',
    info: {
      title: 'Drone Cloud Platform API',
      version: '1.0.0',
      description: 'Documentation of Drone Cloud Platform RESTful API \nFor more swagger specification, please visit [Swagger.io/docs](https://swagger.io/docs/specification/)\n OpenAPI 2.0',
      contact: {
        name: 'maintainer - Tony',
        email: 'waiting33118@gmail.com'
      }
    }
  },
  apis: ['/backend/routes/v1/api.js']
})
