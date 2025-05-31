import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { CreateNote, CreateNoteResponse, DeleteNoteResponse, GetAllNotes, UpdateNote, UpdateNoteResponse } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
    token = localStorage.getItem('token');
    headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    private apiUrl = `${environment.backendUrl}`; // replace with your API endpoint

    constructor(private http: HttpClient) {}

    getChatRoom(caseId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/api/chats/${caseId}`, { headers: this.headers });
    }

    getAllMessages(chatRoomId: string): Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/api/chats/${chatRoomId}/messages`, { headers: this.headers });
    }
}