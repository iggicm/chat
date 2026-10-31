interface Message {fromId: string | number; toId: string | number; message: string;}
interface ParticipantResponse {participant: unknown; metadata?: unknown;}
import {Observable} from 'rxjs';

export class MyAdapter {
  getMessageHistory(destinataryId: any): Observable<Message[]> {
    return new Observable<Message[]>();
  }

  listFriends(): Observable<ParticipantResponse[]> {
    return new Observable<ParticipantResponse[]>();
  }

  sendMessage(message: Message): void {
  }

}
