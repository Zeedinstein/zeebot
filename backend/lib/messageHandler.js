import { getFacebookUser, sendMessageToCustomer } from './facebookAPI'
import { CustomerDoesNotExist } from '../lib/errors'
import Customer from '../models/Customer'

export const handleNewMessage = async messageObject => {
  if ('sender' in messageObject) {
    let user = await getFacebookUser(messageObject.sender.id)
    try {
        let customer = await checkIfNewCustomer(user)
        // if customer exist add to conversation
        customer.conversation.push({
            sender: "CUSTOMER",
            text: messageObject.message.text,
        })
        customer.save()
    } catch (error) {
        // if customer does not exist create Customer
        if (error instanceof CustomerDoesNotExist) {
            let customer = new Customer({
                psid: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                profile_pic: user.profile_pic,
                conversation: [{
                    sender: "CUSTOMER",
                    text: messageObject.message.text,
                    mid: messageObject.message.mid
                }]
            })
            await customer.save()
        }
    }
  }
}

export const checkIfNewCustomer = async (user) => {
    let customer = await Customer.findOne({psid: user.id}).exec()
    if (customer) {
        return customer
    } else {
        throw new CustomerDoesNotExist()
    }
}

