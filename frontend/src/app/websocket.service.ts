import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor(public socket: Socket) {}

  sendNewMessage(message: any) {
    this.socket.emit('NewMessage', message);
    console.log(message)
  }
}
