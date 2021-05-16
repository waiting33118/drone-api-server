module.exports = {
  timeStamp () {
    return new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
  },

  serverStarted (port) {
    console.log(`===Server is listen on port ${port}===`)
  },

  databaseCheckSuccess () {
    console.log('===Database connection test success===')
  },

  databaseCheckFailed (message) {
    console.log('===Database connection test failed===\n', message)
  },

  terminateSignal () {
    console.log('\n===RECIEVED TERMINATE SIGNAL===\n===READY TO SHUTDOWN===')
  },

  processExit (code) {
    console.log(`===Process exit event with code: ${code}===`)
  },

  mqttCheckSuccess () {
    console.log('===Mqtt connection test success===')
  },

  mqttCheckFailed (message) {
    console.log('===Mqtt connection test failed===\n', message)
  },

  mqttClientConnect (mqttId, user) {
    console.log(this.timeStamp())
    console.log(`===Mqtt client: ${mqttId} established connection===`)
    console.log(`===User:${user.name} Drone ID:${user.droneId}===`)
    console.log('===Start subscribe topics===')
  },

  mqttClientUnSubscribe (droneId) {
    console.log(`===Client ${droneId} unsubscribe all topics===`)
  },

  webSocketConnect (socketId) {
    console.log(this.timeStamp())
    console.log(`===WebSocket client: ${socketId} connected===`)
  },

  webSocketDisconnect (socketId, reason) {
    console.log(this.timeStamp())
    console.log(`===WebSocket client: ${socketId} disconnected===`)
    console.log(`DisConnected reason: ${reason}`)
  },

  webSocketJoinRoom (socket, roomId) {
    console.log(`===Websocket client: ${socket.id} join room ${roomId}===`)
  },

  signupFieldIncorrect () {
    return 'Email, Password, CheckPassword and DroneId are required!'
  },

  signupPasswordLengthIncorrect () {
    return 'Password must above or include 8 characters!'
  },

  signupPasswordunMatchCheckPassword () {
    return 'Password and CheckPassword are not match!'
  },

  signupEmailExist () {
    return 'Email registered, Please login or change an email!'
  },

  signinFieldIncorrect () {
    return 'Email and Password are required!'
  },

  signinUserNotFound () {
    return 'User not found!'
  },

  signinInvalidPassword () {
    return 'Invalid password!'
  },

  tokenExpired () {
    return 'Token Expired!'
  },

  tokenError () {
    return 'Token Error!'
  },

  duplicateLogin () {
    return 'User has already login at another device!'
  },

  alreadySignout () {
    return 'User has already signout!'
  }
}
