import socketio from 'socket.io'
import {server} from '../server'

const io = socketio(server)

io.on('connection', () => {
    console.log('user connected to websocket')
})

