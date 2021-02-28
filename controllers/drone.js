const mqtt = require('mqtt')
const client = mqtt.connect('tcp://35.201.182.150')

const DRONE_COMMAND = {
  ARM: 'ARM',
  DISARM: 'DISARM',
  TAKEOFF: 'TAKEOFF',
  LAND: 'LAND',
  GOTO: 'GOTO',
  CHANGE_FLIGHT_MODE: 'CHANGE_FLIGHT_MODE',
  CHANGE_SPEED: 'CHANGE_SPEED',
  CHANGE_YAW: 'CHANGE_YAW',
  SERVO_ACTION: 'SERVO_ACTION',
  GIMBAL_CONTROL: 'GIMBAL_CONTROL'
}

const droneService = {
  arm (req, res) {
    client.publish('drone/cmd', JSON.stringify({ cmd: DRONE_COMMAND.ARM }), err => {
      err
        ? res.json({ err })
        : res.json({
          cmd: DRONE_COMMAND.ARM,
          status: 'success'
        })
    })
  },

  disarm (req, res) {
    client.publish('drone/cmd', JSON.stringify({ cmd: DRONE_COMMAND.DISARM }), err => {
      err
        ? res.json({ err })
        : res.json({
          cmd: DRONE_COMMAND.DISARM,
          status: 'success'
        })
    })
  },

  takeOff (req, res) {
    const command = {
      cmd: DRONE_COMMAND.TAKEOFF,
      ...req.body
    }
    client.publish('drone/cmd', JSON.stringify(command), err => {
      err
        ? res.json({ err })
        : res.json({
          cmd: DRONE_COMMAND.TAKEOFF,
          status: 'success'
        })
    })
  },

  land (req, res) {
    client.publish('drone/cmd', JSON.stringify({ cmd: DRONE_COMMAND.LAND }), err => {
      err
        ? res.json({ err })
        : res.json({
          cmd: DRONE_COMMAND.LAND,
          status: 'success'
        })
    })
  },

  goTo (req, res) {
    const command = {
      cmd: DRONE_COMMAND.GOTO,
      ...req.body
    }
    client.publish('drone/cmd', JSON.stringify(command), err => {
      err
        ? res.json({ err })
        : res.json({
          cmd: DRONE_COMMAND.GOTO,
          status: 'success'
        })
    })
  },

  changeFlightMode (req, res) {
    const { mode } = req.body
    client.publish('drone/cmd', JSON.stringify({ cmd: mode }), err => {
      err
        ? res.json({ err })
        : res.json({
          cmd: DRONE_COMMAND.CHANGE_FLIGHT_MODE,
          status: 'success'
        })
    })
  },

  changeSpeed (req, res) {
    const command = {
      cmd: DRONE_COMMAND.CHANGE_SPEED,
      ...req.body
    }
    client.publish('drone/cmd', JSON.stringify(command), err => {
      err
        ? res.json({ err })
        : res.json({
          cmd: DRONE_COMMAND.CHANGE_SPEED,
          status: 'success'
        })
    })
  },

  changeYaw (req, res) {
    const command = {
      cmd: DRONE_COMMAND.CHANGE_YAW,
      ...req.body
    }
    client.publish('drone/cmd', JSON.stringify(command), err => {
      err
        ? res.json({ err })
        : res.json({
          cmd: DRONE_COMMAND.CHANGE_YAW,
          status: 'success'
        })
    })
  },

  servoControl (req, res) {
    const { action } = req.body
    client.publish('drone/cmd', JSON.stringify({ cmd: action }), err => {
      err
        ? res.json({ err })
        : res.json({
          cmd: DRONE_COMMAND.SERVO_ACTION,
          status: 'success'
        })
    })
  },

  gimbalControl (req, res) {
    client.publish('drone/cmd', JSON.stringify({ ...req.body }), err => {
      err
        ? res.json({ err })
        : res.json({
          cmd: DRONE_COMMAND.GIMBAL_CONTROL,
          status: 'success'
        })
    })
  }
}

module.exports = droneService
