const express = require('express')
const router = express.Router()
const { droneService, authService } = require('../../controllers')
const { checkAuthenticate } = require('../../middlewares')

router.post('/signup', authService.signUp)
router.post('/signin', authService.signIn)
router.post('/refreshtoken', authService.refreshAccessToken)

router.post('/arm', checkAuthenticate, droneService.arm)
router.post('/disarm', droneService.disarm)
router.post('/takeoff', droneService.takeOff)
router.post('/land', droneService.land)
router.post('/goto', droneService.goTo)
router.post('/changeflightmode', droneService.changeFlightMode)
router.post('/changespeed', droneService.changeSpeed)
router.post('/changeyaw', droneService.changeYaw)
router.post('/servocontrol', droneService.servoControl)
router.post('/gimbalcontrol', droneService.gimbalControl)

module.exports = router

/**
 * @swagger
 * paths:
 *   /arm:
 *     post:
 *       tags:
 *         - Drone Service
 *       description: >
 *         **Command** ARM
 *       responses:
 *         200:
 *           schema:
 *             type: object
 *             properties:
 *               cmd:
 *                 type: string
 *                 description: The drone command.
 *               status:
 *                 type: string
 *                 description: success
 */

/**
 * @swagger
 * paths:
 *   /disarm:
 *     post:
 *       tags:
 *         - Drone Service
 *       description: >
 *         **Command** DISARM
 *       responses:
 *         200:
 *           schema:
 *             type: object
 *             properties:
 *               cmd:
 *                 type: string
 *                 description: The drone command.
 *               status:
 *                 type: string
 *                 description: success
 */

/**
 * @swagger
 * paths:
 *   /takeoff:
 *     post:
 *       tags:
 *         - Drone Service
 *       description: >
 *         **Command** TAKEOFF
 *       responses:
 *         200:
 *           schema:
 *             type: object
 *             properties:
 *               cmd:
 *                 type: string
 *                 description: The drone command.
 *               status:
 *                 type: string
 *                 description: success
 */

/**
 * @swagger
 * paths:
 *   /land:
 *     post:
 *       tags:
 *         - Drone Service
 *       description: >
 *         **Command** LAND
 *       responses:
 *         200:
 *           schema:
 *             type: object
 *             properties:
 *               cmd:
 *                 type: string
 *                 description: The drone command.
 *               status:
 *                 type: string
 *                 description: success
 */

/**
 * @swagger
 * paths:
 *   /goto:
 *     post:
 *       tags:
 *         - Drone Service
 *       description: >
 *         **Command** GOTO
 *       responses:
 *         200:
 *           schema:
 *             type: object
 *             properties:
 *               cmd:
 *                 type: string
 *                 description: The drone command.
 *               status:
 *                 type: string
 *                 description: success
 */

/**
 * @swagger
 * paths:
 *   /changeflightmode:
 *     post:
 *       tags:
 *         - Drone Service
 *       description: >
 *         **Command** CHANGE FLIGHT MODE
 *       responses:
 *         200:
 *           schema:
 *             type: object
 *             properties:
 *               cmd:
 *                 type: string
 *                 description: The drone command.
 *               status:
 *                 type: string
 *                 description: success
 */

/**
 * @swagger
 * paths:
 *   /changespeed:
 *     post:
 *       tags:
 *         - Drone Service
 *       description: >
 *         **Command** CHANGE SPEED
 *       responses:
 *         200:
 *           schema:
 *             type: object
 *             properties:
 *               cmd:
 *                 type: string
 *                 description: The drone command.
 *               status:
 *                 type: string
 *                 description: success
 */

/**
 * @swagger
 * paths:
 *   /changeyaw:
 *     post:
 *       tags:
 *         - Drone Service
 *       description: >
 *         **Command** CHANGE YAW
 *       responses:
 *         200:
 *           schema:
 *             type: object
 *             properties:
 *               cmd:
 *                 type: string
 *                 description: The drone command.
 *               status:
 *                 type: string
 *                 description: success
 */

/**
 * @swagger
 * paths:
 *   /servocontrol:
 *     post:
 *       tags:
 *         - Drone Service
 *       description: >
 *         **Command** SERVO CONTROL
 *       responses:
 *         200:
 *           schema:
 *             type: object
 *             properties:
 *               cmd:
 *                 type: string
 *                 description: The drone command.
 *               status:
 *                 type: string
 *                 description: success
 */

/**
 * @swagger
 * paths:
 *   /gimbalcontrol:
 *     post:
 *       tags:
 *         - Drone Service
 *       description: >
 *         **Command** GIMBAL CONTROL
 *       responses:
 *         200:
 *           schema:
 *             type: object
 *             properties:
 *               cmd:
 *                 type: string
 *                 description: The drone command.
 *               status:
 *                 type: string
 *                 description: success
 */
