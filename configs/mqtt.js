const mqtt = require('mqtt')
const client = mqtt.connect('tcp://35.201.182.150')

module.exports = {
  useMqtt: () => {
    client.on('connect', () => {
      client.subscribe('drone/message', (err, success) => {
        if (err) console.log(err)
        console.log('Subscribe Topic: drone')
      })
    })

    client.on('message', (topic, message) => {
      console.log(topic)
      console.log(JSON.parse(message.toString()))
    })
  }
}
