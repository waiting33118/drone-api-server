const mqtt = require('mqtt')

module.exports = {
  connect (username, password, host, port) {
    return mqtt.connect(host, {
      username,
      password,
      port
    })
  },

  topicGenerator (droneId) {
    return [
      `${droneId}/message`,
      `${droneId}/cmd_ack`,
      `${droneId}/mission_ack`,
      `${droneId}/apm_text`
    ]
  },

  parseMessage (buffer) {
    return JSON.parse(buffer.toString())
  }
}
