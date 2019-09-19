// Import config
import 'dotenv/config'
import './lib/database'
import { createServer } from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
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

const server = createServer(app)

export const io = socketio(server)

server.listen(process.env.PORT,"127.0.0.1", () => {
  console.log(`API running on port ${process.env.PORT}`)
})
