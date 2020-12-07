const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://waiting33118.github.io/drone-cloud-platform3.0',
    methods: ['GET', 'POST']
  }
})
const cors = require('cors')
const dotEnv = require('dotenv')
const { useMqtt } = require('./configs/mqtt')
const routes = require('./routes')

if (process.env.NODE_ENV === 'development') dotEnv.config()
const { PORT } = process.env

useMqtt(io)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)

server.listen(PORT, () => console.log(`The server is listening on port ${PORT.toString()}`))
