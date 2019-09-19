// Import config
import 'dotenv/config'
import { createServer } from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import database from './lib/database'
import socketio from 'socket.io'
// Import routes
import webhook_routes from './routes/webhooks'

const app = express()

app.use(bodyParser.json())
app.use(
  cors({
    origin: '*'
  })
)
// Initialize routes
app.use('', webhook_routes)

const server = require( "http" ).createServer(app)

const io = socketio(server)

io.on('connection', () => {
    console.log('user connected to websocket')
})

export const sentMessageViaWebsocket = (message) => {
    io.emit('NewMessage', message)
}

server.listen(process.env.PORT,"127.0.0.1", () => {
  console.log(`API running on port ${process.env.PORT}`)
})
