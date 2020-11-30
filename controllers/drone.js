const mqtt = require('mqtt')
const client = mqtt.connect('tcp://35.201.182.150')

const droneAPI = {
  takeOff (req, res) {
    const command = {
      cmd: 'TAKEOFF',
      ...req.body
    }
    client.publish('drone/cmd', JSON.stringify(command), err => {
      err
        ? res.send(err)
        : res.json({
          cmd: 'TAKEOFF',
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
          cmd: 'LAND',
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
          cmd: 'GOTO',
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
          cmd: 'CHANGE_FLIGHT_ALTITUDE',
          status: 'success'
        })
    })
  },

  returnToLand (req, res) {
    client.publish('drone/cmd', JSON.stringify({ cmd: 'rtl' }), err => {
      err ? res.send(err) : res.json({ status: 'success' })
    })
  }
}

module.exports = droneAPI
