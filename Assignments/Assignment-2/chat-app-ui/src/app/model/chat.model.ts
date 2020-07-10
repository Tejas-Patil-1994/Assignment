export class ChatModel {
  chatMessage: string;
  isReceiver: boolean;
  userID: string;
  receivedTime: Date;
  constructor() {
    this.chatMessage = '';
    this.isReceiver = false;
  }
}
