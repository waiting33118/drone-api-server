const express = require('express')
const droneAPI = require('../../controllers/drone')
const router = express.Router()

router.post('/arm', droneAPI.arm)
router.post('/disarm', droneAPI.disarm)
router.post('/takeoff', droneAPI.takeOff)
router.post('/land', droneAPI.land)
router.post('/goto', droneAPI.goTo)
router.post('/changeflightmode', droneAPI.changeFlightMode)
router.post('/changespeed', droneAPI.changeSpeed)
router.post('/changeyaw', droneAPI.changeYaw)
router.post('/servocontrol', droneAPI.servoContol)

module.exports = router
