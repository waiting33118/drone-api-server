const signalInit = (io) => {
  io.on('connection', socket => {
    socket.on('joinRoom', droneId => {
      socket.join(droneId)
      console.log('Join Room', socket.rooms)
    })

    socket.on('sendOffer', offer => {
      const roomId = [...socket.rooms.keys()][1]
      console.log(`recieve ${socket.id}'s offer`)
      if (typeof offer === 'string') {
        offer = JSON.parse(offer)
      }
      socket.to(roomId).emit('offer', offer)
    })

    socket.on('sendAnswer', answer => {
      const roomId = [...socket.rooms.keys()][1]
      console.log(`recieve ${socket.id}'s answer`)
      socket.to(roomId).emit('answer', answer)
    })

    socket.on('sendCandidate', candidate => {
      const roomId = [...socket.rooms.keys()][1]
      console.log(`recieve ${socket.id}'s candidate`)
      socket.to(roomId).emit('candidate', candidate)
    })
  })
}

module.exports = signalInit
