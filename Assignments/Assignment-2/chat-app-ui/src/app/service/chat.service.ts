import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, catchError } from 'rxjs/operators';
import { ChatModel } from '../model/chat.model';
@Injectable()
export class ChatService {
  userID: string;
  constructor(private socket: Socket) {
    this.userID = Math.floor((Math.random()) * 0x10000).toString(16);
  }

  sendMessage(msg: ChatModel) {
    this.socket.emit('message', msg);
  }

  getMessage() {
    return this.socket
      .fromEvent('message')
      .pipe(
        map((data) => data)
      );
  }

}
