import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatModel } from './model/chat.model';
import { Subscription } from 'rxjs';
import { ChatService } from './service/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'chat-app-ui';
  chatText: string;
  chatMesageList: ChatModel[] = [];
  chatMessageSubscription: Subscription;

  constructor(private chatService: ChatService) {
    this.chatMessageSubscription = new Subscription();
    this.chatText = '';
  }
  ngOnInit() {
    this.chatMessageSubscription = this.chatService.getMessage().subscribe((message: ChatModel) => {
      if (message.userID === this.chatService.userID) {
        message.isReceiver = false;
      } else {
        message.isReceiver = true;
      }
      message.receivedTime = new Date();
      this.chatMesageList.push(message);
    }, error => {
      console.error('Error in getting message' + error);
    });
  }

  ngOnDestroy() {
    this.chatMessageSubscription.unsubscribe();
  }

  sendMessage() {
    const messageObject = new ChatModel();
    messageObject.chatMessage = this.chatText;
    messageObject.userID = this.chatService.userID;
    this.chatService.sendMessage(messageObject);
    this.chatText = '';
  }
}
