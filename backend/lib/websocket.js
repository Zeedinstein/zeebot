import { io } from '../server'
import Customer from '../models/Customer'
import { sendMessageToCustomer } from './facebookAPI'

io.on('connection', async () => {
    console.log('user connected to websocket')
    emitAllCustomers()
})

io.on('NewMessage', async (message) => {
    if ('recipient' in message) {
        try {
            let customer = await Customer.findOne({ psid: message.recipient.id }).exec()
            customer.conversation.push({
                sender: 'AGENT',
                text: message.message.text
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