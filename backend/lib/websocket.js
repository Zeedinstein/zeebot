import socketio from 'socket.io'
import {server} from '../server'

const io = socketio.listen(server)

io.on('connection', () => {
    console.log('user connected to websocket')
})

export const sentMessageViaWebsocket = (message) => {
    io.emit('NewMessage', message)
}
