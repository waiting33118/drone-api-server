const mqtt = require('mqtt')
const { MQTT_USERNAME, MQTT_PASSWORD, MQTT_HOST } = process.env
const test = mqtt.connect(MQTT_HOST, {
  username: MQTT_USERNAME,
  password: MQTT_PASSWORD,
  port: 1883
})

// Test MQTT connection
test.on('connect', () => {
  console.log('MQTT connection test succeed!')
  test.end()
})
test.on('error', (error) => console.log(error))

const mqttInit = (io) => {
  io.on('connection', socket => {
    let subscribeClient

    console.log(new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }), 'socketId:', socket.id)

    socket.on('disconnect', (reason) => {
      console.log(new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }), reason)
      subscribeClient.end()
    })

    socket.on('mqttSubscribe', (user) => {
      subscribeClient = mqtt.connect(MQTT_HOST, {
        username: MQTT_USERNAME,
        password: MQTT_PASSWORD,
        port: 1883
      })

      subscribeClient.on('connect', () => console.log('New mqtt connection established', 'clientId:', subscribeClient.options.clientId))
      console.log(`\nUser: [${user.name}] ID: [${user.droneId}] connected! Start subscribing topics`)

      subscribeClient.subscribe(topicGenerator(user.droneId), (err, success) => {
        if (err) {
          console.log(err)
          return
        }
        console.log(success)
      })

      subscribeClient.on('message', (topic, payload) => {
        switch (topic.slice(topic.indexOf('/') + 1)) {
          case 'message':
            socket.emit(topic, parseMessage(payload))
            break
          case 'cmd_ack':
            socket.emit(topic, parseMessage(payload))
            break
          case 'mission_ack':
            socket.emit(topic, parseMessage(payload))
            break
          case 'apm_text':
            socket.emit(topic, parseMessage(payload))
            break
        }
      })
    })

    socket.on('mqttUnsubscribe', (droneId) => {
      subscribeClient.unsubscribe(topicGenerator(droneId), (err) => {
        if (err) {
          console.log(err)
          return
        }
        console.log(`${droneId} Unsubscribe all topics`)
      })
    })
  })
}

/**
 * Turn buffer message to JSON format
 * @param {Buffer} message the message sent from mqtt broker
 * @returns {object} formated message
 */
function parseMessage (message) {
  const formattedMsg = JSON.parse(message.toString())
  return formattedMsg
}

/**
 * Return a topic array that need to subscribe
 * @param {number} droneId
 * @returns topic array
 */
function topicGenerator (droneId) {
  return [
    `${droneId}/message`,
    `${droneId}/cmd_ack`,
    `${droneId}/mission_ack`,
    `${droneId}/apm_text`
  ]
}

module.exports = mqttInit
