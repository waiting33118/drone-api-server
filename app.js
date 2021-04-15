const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})
const cors = require('cors')
const { mqttInit, signalInit, db } = require('./config')
const { routes } = require('./routes')

const { PORT } = process.env

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(routes)

mqttInit(io)
signalInit(io)

server.listen(PORT, async () => {
  console.log(`The server is listening on port ${PORT}`)
  if (process.env.NODE_ENV === 'development') console.log('API docs: http://0.0.0.0:3030/api-docs')
  try {
    await db.authenticate()
    console.log('Database connection has been established successfully.')
  } catch (error) {
    console.log('Unable to connect to the database:', error)
  }
})
