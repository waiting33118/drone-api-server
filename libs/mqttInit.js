const log = require('./log')
const mqtt = require('./mqtt')

const { MQTT_USERNAME, MQTT_PASSWORD, MQTT_HOST } = process.env

const testClient = mqtt.connect(MQTT_USERNAME, MQTT_PASSWORD, MQTT_HOST, 1883)
testClient.on('connect', () => {
  log.mqttCheckSuccess()
  testClient.end()
})
testClient.on('error', error => log.mqttCheckFailed(error.message))

module.exports = function mqttInit (io) {
  io.on('connection', socket => {
    let mqttClient
    log.webSocketConnect(socket.id)

    socket.on('disconnect',
      reason => log.webSocketDisconnect(socket.id, reason))

    socket.on('mqttSubscribe', (user) => {
      mqttClient = mqtt.connect(MQTT_USERNAME, MQTT_PASSWORD, MQTT_HOST, 1883)
      mqttClient.on('connect',
        () => log.mqttClientConnect(mqttClient.options.clientId, user))

      mqttClient.subscribe(mqtt.topicGenerator(user.droneId), (error, success) => {
        if (error) {
          console.log(error)
          return
        }
        console.log(success)
      })

      mqttClient.on('message', (topic, payload) => {
        payload = mqtt.parseMessage(payload)
        switch (topic.slice(topic.indexOf('/') + 1)) {
          case 'message':
            socket.emit(topic, payload)
            break
          case 'cmd_ack':
            socket.emit(topic, payload)
            break
          case 'mission_ack':
            socket.emit(topic, payload)
            break
          case 'apm_text':
            socket.emit(topic, payload)
            break
        }
      })
    })

    socket.on('mqttUnsubscribe', droneId => {
      mqttClient.unsubscribe(mqtt.topicGenerator(droneId), error => {
        if (error) {
          console.log(error)
          return
        }
        log.mqttClientUnSubscribe(droneId)
      })
    })
  })
}
