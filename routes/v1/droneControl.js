const express = require('express')
const droneAPI = require('../../controllers/drone')
const router = express.Router()

router.post('/takeoff', droneAPI.takeOff)
router.post('/land', droneAPI.land)
router.post('/goto', droneAPI.goTo)
router.post('/cfa', droneAPI.changeFlightAltitude)
router.post('/rtl', droneAPI.returnToLand)

module.exports = router
