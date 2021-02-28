const mqtt = require('mqtt')
const client = mqtt.connect('tcp://35.201.182.150')

/**
 * Turn buffer message to JSON format
 * @param {Buffer} message the message sent from mqtt broker
 * @returns {object} formated message
 */
const parseMessage = (message) => {
  const formattedMsg = JSON.parse(message.toString())
  return formattedMsg
}

const mqttInit = (io) => {
  io.on('connection', socket => {
    console.log(new Date().toLocaleString(), socket.id)
    socket.on('disconnect', (reason) => console.log(new Date().toLocaleString(), reason))
  })

  client.on('connect', () => {
    client.subscribe('drone/message', (err, success) => {
      if (err) return console.log(err)
      console.log('Subscribe Topic: drone/message')
    })
    client.subscribe('drone/cmd_ack', (err, success) => {
      if (err) return console.log(err)
      console.log('Subscribe Topic: drone/cmd_ack')
    })
    client.subscribe('drone/mission_ack', (err, success) => {
      if (err) return console.log(err)
      console.log('Subscribe Topic: drone/mission_ack')
    })
    client.subscribe('drone/apm_text', (err, success) => {
      if (err) return console.log(err)
      console.log('Subscribe Topic: drone/apm_text')
    })
  })

  client.on('message', (topic, message) => {
    switch (topic) {
      case 'drone/message': {
        const msg = parseMessage(message)
        io.emit('message', msg)
        break
      }
      case 'drone/cmd_ack': {
        const msg = parseMessage(message)
        io.emit('ack', msg)
        break
      }
      case 'drone/mission_ack': {
        const msg = parseMessage(message)
        io.emit('mission', msg)
        break
      }
      case 'drone/apm_text': {
        const msg = parseMessage(message)
        io.emit('apm', msg)
        break
      }
    }
  })
}

module.exports = mqttInit
