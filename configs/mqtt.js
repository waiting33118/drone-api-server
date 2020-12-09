const mqtt = require('mqtt')
const client = mqtt.connect('tcp://35.201.182.150')

module.exports = {
  useMqtt (io) {
    io.on('connection', socket => {
      console.log(new Date().toLocaleString(), socket.id)
      socket.on('disconnect', (reason) => console.log(new Date().toLocaleString(), reason))
    })

    client.on('connect', () => {
      client.subscribe('drone/message', (err, success) => {
        if (err) console.log(err)
        console.log('Subscribe Topic: drone')
      })
      client.subscribe('phone/message', (err, success) => {
        if (err) console.log(err)
        console.log('Subscribe Topic: phone')
      })
    })

    client.on('message', (topic, message) => {
      switch (topic) {
        case 'drone/message': {
          const msg = parseMessage(message)
          io.emit('drone_status', msg)
          break
        }
        case 'phone/message': {
          const msg = parseMessage(message)
          io.emit('phone_status', msg)
          break
        }
      }
    })
  }
}

/**
 * Turn buffer message to JSON format
 * @param {Buffer} message the message sent from mqtt broker
 * @returns {object} Object of message
 */
function parseMessage (message) {
  const formattedMsg = JSON.parse(message.toString())
  // console.log(formattedMsg)
  return formattedMsg
}

/*
{
  drone_message: {
    timestamp: '2020-12-03 17:52:06',
    location: {
      lat: '25.0430161',
      lng: '121.536218',
      alt: '10.02',
      relative_alt: '-0.01',
      heading: '85.19'
    },
    battery: { voltage: '12.587', current: '0.0', percentage: '0' },
    speed: { air_speed: '0.00', gnd_speed: '0.10' },
    attitude: { roll: '-0.32', pitch: '-0.33', yaw: '85.19' },
    gps_status: {
      fix_type: 'GPS_FIX_TYPE_RTK_FIXED',
      hpop: '1.21',
      vdop: '2.00',
      cog: '22608',
      gps_count: '10'
    },
    heartbeat: {
      mav_type: 'MAV_TYPE_GCS',
      mav_autopilot: 'MAV_AUTOPILOT_ARDUPILOTMEGA',
      base_mode: '81',
      custom_mode: 'LAND',
      system_status: 'MAV_STATE_STANDBY',
      is_armed: '0'
    }
  }
}
{
  phone_message: {
    device_id: 'c756023fc7039ee5',
    connectivity: {},
    signal_strength: {
      isConnected: true,
      isAvailable: true,
      isFailover: false,
      isRoaming: false
    }
  }
}
 */
