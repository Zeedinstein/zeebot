import { getFacebookUser } from './facebookAPI'
import { CustomerDoesNotExist } from '../lib/errors'
import { sentMessageViaWebsocket, emitAllCustomers } from '../server'
import Customer from '../models/Customer'

export const handleNewMessage = async messageObject => {
  if ('sender' in messageObject) {
    let user = await getFacebookUser(messageObject.sender.id)
    try {
      let customer = await checkIfNewCustomer(user)
      let message = {
        sender: customer.psid,
        text: messageObject.message.text
      }
      // if customer exist add to conversation
      customer.conversation.push(message)
      await customer.save()
      sentMessageViaWebsocket(message)
    } catch (error) {
      // if customer does not exist create Customer
      if (error instanceof CustomerDoesNotExist) {
        let message = {
          sender: user.id,
          text: messageObject.message.text
        }
        let customer = new Customer({
          psid: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          profile_pic: user.profile_pic,
          conversation: [message]
        })
        await customer.save()
        await emitAllCustomers()
        sentMessageViaWebsocket(message)
      }
    }
  }
}

export const checkIfNewCustomer = async user => {
  let customer = await Customer.findOne({ psid: user.id }).exec()
  if (customer) {
    return customer
  } else {
    throw new CustomerDoesNotExist()
  }
}
