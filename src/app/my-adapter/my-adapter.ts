import {ChatAdapter, Message, ParticipantResponse} from 'ng-chat';
import {Observable} from 'rxjs';

export class MyAdapter extends ChatAdapter{
  getMessageHistory(destinataryId: any): Observable<Message[]> {
    return new Observable<Message[]>();
  }

  listFriends(): Observable<ParticipantResponse[]> {
    return new Observable<ParticipantResponse[]>();
  }

  sendMessage(message: Message): void {
  }

}
