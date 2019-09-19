import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import { WebsocketService } from '../websocket.service';
import Customer from '../../models/Customer';

@Component({
  selector: 'app-messaging-page',
  templateUrl: './messaging-page.component.html',
  styleUrls: ['./messaging-page.component.sass']
})
export class MessagingPageComponent implements OnInit {
  Customers: Array<Customer> = [];
  selectedCustomer: Customer = null;
  messageBox = new FormControl('')

  constructor(private ws: WebsocketService) {}

  ngOnInit() {
    this.ws.socket.on('NewMessage', this.handleMessage);
    this.ws.socket.on('AllCustomers', this.handleAllCustomers);
  }

  handleAllCustomers(customers: Array<Customer>) {
    this.Customers = customers;
  }

  handleMessage(msg: { sender: string; text: string }) {
    this.Customers.forEach((customer, index) => {
      if (customer.psid == msg.sender) {
        this.Customers[index].conversation.push(msg);
      }
    });
    console.log(msg);
  }

  selectCustomer(customer: Customer) {
    this.selectedCustomer = customer
  }

  sendMessage() {
    this.ws.sendNewMessage({
      sender: 'AGENT',
      text: this.messageBox.value
    })
  }
}
