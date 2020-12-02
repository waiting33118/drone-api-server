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
  disArm (req, res) {
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

  changeFlightAltitude (req, res) {
    const command = {
      cmd: 'CHANGE_FLIGHT_ALTITUDE',
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
    client.publish('drone/cmd', JSON.stringify(command), err => {
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
