const express = require('express')
const cors = require('cors')
const http = require('http')
const cookieParser = require('cookie-parser')
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: ['http://localhost:8080', 'https://localhost:8080']
  }
})
const routes = require('./routes')
const { db, log, mqttInit, signalInit } = require('./libs')

const { PORT } = process.env

app.use(cors({
  origin: ['http://localhost:8080', 'https://localhost:8080'],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(routes)

mqttInit(io)
signalInit(io)

server.listen(PORT, async () => {
  log.serverStarted(PORT)
  try {
    await db.authenticate()
    log.databaseCheckSuccess()
  } catch (error) {
    log.databaseCheckFailed(error.message)
  }
})

process.on('SIGINT', () => {
  log.terminateSignal()
  process.exit()
})

process.on('SIGTERM', () => {
  log.terminateSignal()
  process.exit()
})

process.on('exit', (code) => log.processExit(code))
