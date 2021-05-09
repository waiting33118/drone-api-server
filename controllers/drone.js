const { mqtt } = require('../libs')

const { MQTT_USERNAME, MQTT_PASSWORD, MQTT_HOST } = process.env
const mqttClient = mqtt.connect(MQTT_USERNAME, MQTT_PASSWORD, MQTT_HOST, 1883)

const DRONE_ACTIONS = {
  ARM: 'ARM',
  DISARM: 'DISARM',
  TAKEOFF: 'TAKEOFF',
  LAND: 'LAND',
  GOTO: 'GOTO',
  CHANGE_SPEED: 'CHANGE_SPEED',
  CHANGE_YAW: 'CHANGE_YAW'
}

const droneService = {
  async arm (req, res) {
    const { droneId } = req.body
    try {
      const result = await publishMessage(droneId, { cmd: DRONE_ACTIONS.ARM })
      res.json(result)
    } catch (error) {
      console.log(error)
      res.status(500).end()
    }
  },

  async disarm (req, res) {
    const { droneId } = req.body
    try {
      const result = await publishMessage(droneId, { cmd: DRONE_ACTIONS.DISARM })
      res.json(result)
    } catch (error) {
      console.log(error)
      res.status(500).end()
    }
  },

  async takeOff (req, res) {
    const { droneId, altitude } = req.body
    try {
      const result = await publishMessage(droneId, { cmd: DRONE_ACTIONS.TAKEOFF, altitude })
      res.json(result)
    } catch (error) {
      console.log(error)
      res.status(500).end()
    }
  },

  async land (req, res) {
    const { droneId } = req.body
    try {
      const result = await publishMessage(droneId, { cmd: DRONE_ACTIONS.LAND })
      res.json(result)
    } catch (error) {
      console.log(error)
      res.status(500).end()
    }
  },

  async goTo (req, res) {
    const { droneId, altitude, lng, lat } = req.body
    try {
      const result = await publishMessage(droneId, { cmd: DRONE_ACTIONS.GOTO, altitude, lng, lat })
      res.json(result)
    } catch (error) {
      console.log(error)
      res.status(500).end()
    }
  },

  async changeFlightMode (req, res) {
    const { droneId, mode } = req.body
    try {
      const result = await publishMessage(droneId, { cmd: mode })
      res.json(result)
    } catch (error) {
      console.log(error)
      res.status(500).end()
    }
  },

  async changeSpeed (req, res) {
    const { droneId, speed } = req.body
    try {
      const result = await publishMessage(droneId, { cmd: DRONE_ACTIONS.CHANGE_SPEED, speed })
      res.json(result)
    } catch (error) {
      console.log(error)
      res.status(500).end()
    }
  },

  async changeYaw (req, res) {
    const { droneId, angle } = req.body
    try {
      const result = await publishMessage(droneId, { cmd: DRONE_ACTIONS.CHANGE_YAW, angle })
      res.json(result)
    } catch (error) {
      console.log(error)
      res.status(500).end()
    }
  },

  async servoControl (req, res) {
    const { droneId, action } = req.body
    try {
      const result = await publishMessage(droneId, { cmd: action })
      res.json(result)
    } catch (error) {
      console.log(error)
      res.status(500).end()
    }
  },

  async gimbalControl (req, res) {
    const { droneId, action, pwm } = req.body
    try {
      const result = await publishMessage(droneId, { cmd: action, pwm })
      res.json(result)
    } catch (error) {
      console.log(error)
      res.status(500).end()
    }
  }
}

/**
 * Mqtt message publisher
 * @param {string} droneId - specify drone ID send from fronend user
 * @param {string} cmd
 */
function publishMessage (droneId, cmd) {
  return new Promise((resolve, reject) => {
    mqttClient.publish(`${droneId}/cmd`, JSON.stringify(cmd), (err) => {
      if (err) return reject(err)
      resolve({
        droneAction: cmd.cmd,
        status: 'success'
      })
    })
  })
}

module.exports = droneService
