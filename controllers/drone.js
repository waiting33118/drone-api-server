const mqtt = require('mqtt')
const client = mqtt.connect('tcp://35.201.182.150')

const droneAPI = {
  arm (req, res) {
    const command = {
      cmd: 'ARM'
    }
    client.publish('drone/cmd', JSON.stringify(command), err => {
      err
        ? res.send(err)
        : res.json({
          cmd: command.cmd,
          status: 'success'
        })
    })
  },
  disarm (req, res) {
    const command = {
      cmd: 'DISARM'
    }
    client.publish('drone/cmd', JSON.stringify(command), err => {
      err
        ? res.send(err)
        : res.json({
          cmd: command.cmd,
          status: 'success'
        })
    })
  },
  takeOff (req, res) {
    const command = {
      cmd: 'TAKEOFF',
      ...req.body
    }
    client.publish('drone/cmd', JSON.stringify(command), err => {
      err
        ? res.send(err)
        : res.json({
          cmd: command.cmd,
          status: 'success'
        })
    })
  },
  land (req, res) {
    const command = {
      cmd: 'LAND'
    }
    client.publish('drone/cmd', JSON.stringify(command), err => {
      err
        ? res.send(err)
        : res.json({
          cmd: command.cmd,
          status: 'success'
        })
    })
  },

  goTo (req, res) {
    const command = {
      cmd: 'GOTO',
      ...req.body
    }
    client.publish('drone/cmd', JSON.stringify(command), err => {
      err
        ? res.send(err)
        : res.json({
          cmd: command.cmd,
          status: 'success'
        })
    })
  },

  changeFlightMode (req, res) {
    const command = {
      cmd: 'CHANGE_FLIGHT_MODE',
      ...req.body
    }
    client.publish('drone/cmd', JSON.stringify({ cmd: command.mode }), err => {
      err
        ? res.send(err)
        : res.json({
          cmd: command.cmd,
          status: 'success'
        })
    })
  },

  changeSpeed (req, res) {
    const command = {
      cmd: 'CHANGE_SPEED',
      ...req.body
    }
    client.publish('drone/cmd', JSON.stringify(command), err => {
      err
        ? res.send(err)
        : res.json({
          cmd: command.cmd,
          status: 'success'
        })
    })
  },

  changeYaw (req, res) {
    const command = {
      cmd: 'CHANGE_YAW',
      ...req.body
    }
    client.publish('drone/cmd', JSON.stringify(command), err => {
      err
        ? res.send(err)
        : res.json({
          cmd: command.cmd,
          status: 'success'
        })
    })
  },

  servoContol (req, res) {
    const command = {
      cmd: 'CHANGE_SPEED',
      ...req.body
    }
    client.publish('drone/cmd', JSON.stringify({ cmd: command.action }), err => {
      err
        ? res.send(err)
        : res.json({
          cmd: command.cmd,
          status: 'success'
        })
    })
  }
}

module.exports = droneAPI

// CHANGE_YAW   機頭轉向 params:angle types: interger 0~359

// SERVO_UP  SERVO_DOWN  SERVO_STOP

// TODO: GIMBAL_FRONT_BACK  1200~1800  mid 1500 params:range type:number(integer)

// TODO: GIMBAL_LEFT_RIGHT 1200~1800 mid 1500  params:range type:number(integer)
