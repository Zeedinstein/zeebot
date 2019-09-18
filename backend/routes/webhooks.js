import { Router } from 'express'
import { handleNewMessage } from '../lib/messageHandler'

const router = Router()

router.get('/webhook', (req, res) => {
  // Parse the query params
  let mode = req.query['hub.mode']
  let token = req.query['hub.verify_token']
  let challenge = req.query['hub.challenge']

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED')
      res.status(200).send(challenge)
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403)
    }
  }
})

router.post('/webhook', (req, res) => {
  let body = req.body
  console.log(body)
  if (body.object == 'page') {
    body.entry.forEach((entry) => {
      entry.messaging.forEach(message => {
        handleNewMessage(message)
        console.log(message.message)
      })
    })
    res.status(200).send('EVENT_RECEIVED')
  } else {
    res.sendStatus(404)
  }
})

export default router
