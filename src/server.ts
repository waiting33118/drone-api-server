import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import http from 'http'
import https from 'https'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { readFileSync } from 'fs'
import { Server } from 'socket.io'
import { ENV_VARIABLE } from './types'
import router from './routes'
import useSocketIO from './services/websocket'
import useDatabase from './services/database'
import useRabbitmq from './services/rabbitmq'

const {
  HTTP_PORT = '3030',
  HTTPS_PORT = '3031',
  NODE_ENV,
  PRIVATE_KEY_PATH = '/private.key',
  CERTIFICATE_PATH = '/certificate.crt'
}: ENV_VARIABLE = process.env

console.log(
  `Private key path: ${PRIVATE_KEY_PATH}\nCert file path: ${CERTIFICATE_PATH}`
)
const options = {
  key: readFileSync(PRIVATE_KEY_PATH),
  cert: readFileSync(CERTIFICATE_PATH)
} as https.ServerOptions

const app = express()
app.use(helmet())
app.use(
  cors({
    origin:
      NODE_ENV === 'production'
        ? 'https://aiotlab-drone-cloud.web.app'
        : 'http://localhost:8080',
    credentials: true,
    maxAge: 300
  })
)
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(router)

const httpServer = http.createServer(app)
const httpsServer = https.createServer(options, app)

const server = NODE_ENV === 'production' ? httpsServer : httpServer
export const io = new Server(server, {
  cors: {
    origin:
      NODE_ENV === 'production'
        ? 'https://aiotlab-drone-cloud.web.app'
        : 'http://localhost:8080'
  }
})

useSocketIO()
useDatabase()
useRabbitmq()

httpServer.listen(+HTTP_PORT, () =>
  console.log(`HTTP server is listening on port ${HTTP_PORT}`)
)
httpsServer.listen(+HTTPS_PORT, () =>
  console.log(`HTTPS server is listening on port ${HTTPS_PORT}`)
)
