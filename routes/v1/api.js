const express = require('express')
const router = express.Router()
const { droneService, authService } = require('../../controllers')
const { checkAuthenticate } = require('../../middlewares')

router.post('/auth/signup', authService.signUp)
router.post('/auth/signin', authService.signIn)
router.post('/auth/refreshtoken', authService.refreshAccessToken)
router.get('/auth/currentuser', checkAuthenticate, authService.fetchUserInfo)

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

/**
 * @swagger
 * paths:
 *   /drone/arm:
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
 *   /drone/disarm:
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
 *   /drone/takeoff:
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
 *   /drone/land:
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
 *   /drone/goto:
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
 *   /drone/changeflightmode:
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
 *   /drone/changespeed:
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
 *   /drone/changeyaw:
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
 *   /drone/servocontrol:
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
 *   /drone/gimbalcontrol:
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

/**
 * @swagger
 * paths:
 *   /auth/signup:
 *     post:
 *       tags:
 *         - Auth Service
 *       description: >
 *         Register account of Drone Cloud Platform
 *       parameters:
 *         - in: body
 *           name: User informations
 *           description: Create user.
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               droneId:
 *                 type: string
 *       responses:
 *          201:
 *            description: User created!
 */

/**
 * @swagger
 * paths:
 *   /auth/signin:
 *     post:
 *       tags:
 *         - Auth Service
 *       description: >
 *         Log in account of Drone Cloud Platform
 *       parameters:
 *         - in: body
 *           name: User email & password
 *           description: User log in.
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *       responses:
 *          200:
 *            description: Sign in successfully!
 */

/**
 * @swagger
 * paths:
 *   /auth/refreshtoken:
 *     post:
 *       tags:
 *         - Auth Service
 *       description: >
 *         Refresh access token
 *       parameters:
 *         - in: body
 *           name: Token
 *           description: The refresh token need to verify.
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *       responses:
 *          200:
 *            description: Refresh access token successfully!
 */

/**
 * @swagger
 * paths:
 *   /auth/currentuser:
 *     get:
 *       tags:
 *         - Auth Service
 *       description: >
 *         Return user information after finished checking authentication
 *       responses:
 *          200:
 *            description: User information
 */
