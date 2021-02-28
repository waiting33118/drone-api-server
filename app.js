const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: ['http://localhost:8080', 'https://waiting33118.github.io/drone-cloud-platform3.0', 'https://waiting33118.github.io'],
    methods: ['GET', 'POST']
  }
})
const cors = require('cors')
const { mqttInit, db } = require('./config')
const { routes } = require('./routes')

const { PORT } = process.env

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)

mqttInit(io)

server.listen(PORT, async () => {
  console.log(`The server is listening on port ${PORT}`)
  console.log('API docs: http://127.0.0.1:3030/api-docs')
  try {
    await db.authenticate()
    console.log('Database connection has been established successfully.')
  } catch (error) {
    console.log('Unable to connect to the database:', error)
  }
})
