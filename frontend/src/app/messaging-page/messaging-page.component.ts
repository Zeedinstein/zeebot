import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service'

@Component({
  selector: 'app-messaging-page',
  templateUrl: './messaging-page.component.html',
  styleUrls: ['./messaging-page.component.sass']
})
export class MessagingPageComponent implements OnInit {

  constructor(private ws: WebsocketService) { }

  ngOnInit() {
    this.ws.socket.on("NewMessage", this.handleMessage)
  }

  handleMessage(msg: any) {
    console.log(msg)
  }

}
