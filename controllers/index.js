const droneService = require('./drone')
const authService = require('./auth')

/**
 * Check server's status when request `GET /`
 * @param {object} res response message
 */
const checkStatus = (req, res) => {
  res.json({
    status: 'success',
    msg: 'Drone cloud platform API server works well!'
  })
}

module.exports.checkStatus = checkStatus
module.exports.droneService = droneService
module.exports.authService = authService
