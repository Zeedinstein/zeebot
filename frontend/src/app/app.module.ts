import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig, Socket } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:8000', options: {} };

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagingPageComponent } from './messaging-page/messaging-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
