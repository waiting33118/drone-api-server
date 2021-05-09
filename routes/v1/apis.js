const express = require('express')
const router = express.Router()
const { droneService, authService, userService } = require('../../controllers')
const { authMiddleware } = require('../../middlewares')

router.post('/auth/signup', authService.signUp)
router.post('/auth/signin', authService.signIn)
router.post('/auth/renewToken', authService.renewToken)

router.get('/user', authMiddleware.verifyToken, authMiddleware.checkDuplicateLogin, userService.fetchUserInfo)
router.post('/user/edit', authMiddleware.verifyToken, userService.editUserInfo)

router.post('/drone/arm', droneService.arm)
router.post('/drone/disarm', droneService.disarm)
router.post('/drone/takeoff', droneService.takeOff)
router.post('/drone/land', droneService.land)
router.post('/drone/goto', droneService.goTo)
router.post('/drone/changeflightmode', droneService.changeFlightMode)
router.post('/drone/changespeed', droneService.changeSpeed)
router.post('/drone/changeyaw', droneService.changeYaw)
router.post('/drone/servocontrol', droneService.servoControl)
router.post('/drone/gimbalcontrol', droneService.gimbalControl)

module.exports = router
