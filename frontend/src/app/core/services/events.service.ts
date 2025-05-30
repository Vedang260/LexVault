import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { CreateNote, CreateNoteResponse, DeleteNoteResponse, GetAllNotes, UpdateNote, UpdateNoteResponse } from '../models/note.model';
import { CreateEvent, CreateEventResponse, DeleteEventResponse, GetAllCaseEvents, GetAllEvents } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
    token = localStorage.getItem('token');
    headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    private apiUrl = `${environment.backendUrl}`; // replace with your API endpoint

  constructor(private http: HttpClient) {}

    createEvent(data: CreateEvent): Observable<CreateEventResponse> {
        return this.http.post<CreateEventResponse>(`${this.apiUrl}/api/events/create`, data, { headers: this.headers });
    }

    // updateNote(noteId: any, data: UpdateNote): Observable<UpdateNoteResponse>{
    //     return this.http.put<UpdateNoteResponse>(`${this.apiUrl}/api/notes/${noteId}`, data, { headers: this.headers });
    // }

    deleteEvent(eventId: string): Observable<DeleteEventResponse>{
        return this.http.delete<DeleteEventResponse>(`${this.apiUrl}/api/events/${eventId}`, { headers: this.headers });
    }

    getAllCaseEvents(caseId: string): Observable<GetAllCaseEvents>{
      return this.http.get<GetAllCaseEvents>(`${this.apiUrl}/api/events/case/${caseId}`, { headers: this.headers });
    }
}