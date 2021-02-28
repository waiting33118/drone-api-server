const sequelize = require('./db')
const mqttInit = require('./mqtt')
const spec = require('./swaggerJsdoc')

module.exports.db = sequelize
module.exports.mqttInit = mqttInit
module.exports.spec = spec
