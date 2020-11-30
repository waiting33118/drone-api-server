const express = require('express')
const cors = require('cors')
const { useMqtt } = require('./configs/mqtt')
// const socketIO = require('socket.io')
const routes = require('./routes')
const app = express()
const PORT = process.env.PORT || 3030

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
useMqtt()

app.use('/', routes)
app.listen(PORT, () => console.log(`The server is listening on port ${PORT.toString()}`))
