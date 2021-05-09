const log = require('./log')

module.exports = function signalServer (io) {
  io.on('connection', socket => {
    let roomId

    socket.on('joinRoom', droneId => {
      socket.join(droneId)
      roomId = [...socket.rooms.keys()][1]
      log.webSocketJoinRoom(socket, roomId)
    })

    socket.on('sendOffer', offer => {
      console.log(`recieve ${socket.id}'s offer`)
      if (typeof offer === 'string') {
        offer = JSON.parse(offer)
      }
      socket.to(roomId).emit('offer', offer)
    })

    socket.on('sendAnswer', answer => {
      console.log(`recieve ${socket.id}'s answer`)
      socket.to(roomId).emit('answer', answer)
    })

    socket.on('sendCandidate', candidate => {
      console.log(`recieve ${socket.id}'s candidate`)
      socket.to(roomId).emit('candidate', candidate)
    })
  })
}
