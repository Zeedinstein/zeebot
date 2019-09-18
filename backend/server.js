// Import config
import 'dotenv/config'
import { createServer } from 'http' 
import express from 'express'
import bodyParser from 'body-parser'
import database from './lib/database'
// Import routes
import webhook_routes from './routes/webhooks'

const app = express()

app.use(bodyParser.json())
// Initialize routes
app.use('', webhook_routes)

export const server = createServer(app)

server.listen(process.env.PORT, () => {
  console.log(`API running on port ${process.env.PORT}`)
})