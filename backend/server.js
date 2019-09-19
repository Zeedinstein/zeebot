// Import config
import 'dotenv/config'
import './lib/database'
import { createServer } from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import socketio from 'socket.io'
import Customer from './models/Customer'
import { sendMessageToCustomer } from './lib/facebookAPI'
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

const io = socketio(server)

io.on('connection', async () => {
  console.log('user connected to websocket')
  emitAllCustomers()
})

io.on('NewMessage', async (message) => {
  if ('recipient' in message) {
      try {
          let customer = await Customer.findOne({ psid: message.recipient }).exec()
          customer.conversation.push({
              sender: message.sender,
              text: message.text
          })
          await customer.save()
          await sendMessageToCustomer({text: message.message.text}, customer.psid)
      } catch (error) {
          console.error(error)
      }
  }
})

export const sentMessageViaWebsocket = (message) => {
  io.emit('NewMessage', message)
}

export const emitAllCustomers = async () => {
  try {
      let customers = await Customer.find().exec()
      io.emit('AllCustomers', customers)
      return
  } catch (e) {
      console.error(e)
      return
  }
}

server.listen(process.env.PORT, () => {
  console.log(`API running on port ${process.env.PORT}`)
})
