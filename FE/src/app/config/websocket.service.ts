import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public stompClient: Client = new Client();
  private readonly SERVER_URL = 'http://localhost:8080/ws';

  connect(onMessage: (msg: any) => void): void {
    const socket = new SockJS(this.SERVER_URL);
    this.stompClient = new Client({
      webSocketFactory: () => socket as WebSocket,
      reconnectDelay: 5000,
      onConnect: () => {
        this.stompClient.subscribe('/topic/public', (message: Message) => {
          onMessage(JSON.parse(message.body));
        });
      }
    });

    this.stompClient.activate();
  }

  sendMessage(message: any): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/chat.send',
        body: JSON.stringify(message),
      });
    }
  }

  disconnect(): void {
    if (this.stompClient && this.stompClient.active) {
      this.stompClient.deactivate();
    }
  }
}
