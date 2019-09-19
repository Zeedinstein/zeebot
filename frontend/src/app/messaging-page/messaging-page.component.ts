import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core'
import { FormControl } from '@angular/forms'
import { WebsocketService } from '../websocket.service'
import Customer from '../../models/Customer'

@Component({
  selector: 'app-messaging-page',
  templateUrl: './messaging-page.component.html',
  styleUrls: ['./messaging-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MessagingPageComponent implements OnInit {
  Customers: Customer[] = []
  selectedCustomer: Customer = null
  messageBox = new FormControl('')
  @ViewChild('chatWindow', {static: true}) chatWindow: ElementRef

  constructor(private ws: WebsocketService) {}

  ngOnInit() {
    this.ws.socket.emit('NewMessage', 'Hello')
    this.ws.socket.on('NewMessage', this.handleMessage.bind(this))
    this.ws.socket.on('AllCustomers', this.handleAllCustomers.bind(this))
  }

  handleAllCustomers(customers: Array<Customer>) {
    this.Customers = customers
  }

  handleMessage(msg: any) {
    this.Customers.forEach((customer, index) => {
      if (customer.psid == msg.sender) {
        this.Customers[index].conversation.push(msg)
      }
      if (msg.recipient == customer.psid) {
        this.Customers[index].conversation.push(msg)
      }
    })
  }

  selectCustomer(customer: Customer) {
    this.selectedCustomer = customer
    setTimeout(() => {
      this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
    }, 300)
  }

  sendMessage() {
    this.ws.socket.emit('NewMessage', {
      recipient: this.selectedCustomer.psid,
      sender: 'AGENT',
      text: this.messageBox.value
    })
    setTimeout(() => {
      this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
    }, 300)
  }
}
