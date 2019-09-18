// Import config
import 'dotenv/config'
import { createServer } from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import database from './lib/database'
// Import routes
import webhook_routes from './routes/webhooks'

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, PATCH, DELETE, OPTIONS'
    )
    res.header('Access-Control-Max-Age', 120)
    return res.status(200).json({})
  }
  next()
})
// Initialize routes
app.use('', webhook_routes)

export const server = app.listen(process.env.PORT, () => {
  console.log(`API running on port ${process.env.PORT}`)
})
