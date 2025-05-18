import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Conversation} from '../models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private apiUrl = 'http://localhost:8080/api/conversation-service';

  constructor(private http: HttpClient) { }

  getConversationForUser(user: string): Observable<any> {
    return this.http.get<Conversation[]>(`${this.apiUrl}/for/${user}`);
  }
}
