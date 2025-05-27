import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { CreateNote, CreateNoteResponse, DeleteNoteResponse, GetAllNotes, UpdateNote, UpdateNoteResponse } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
    token = localStorage.getItem('token');
    headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    private apiUrl = `${environment.backendUrl}`; // replace with your API endpoint

  constructor(private http: HttpClient) {}

    createNote(data: CreateNote): Observable<CreateNoteResponse> {
        return this.http.post<CreateNoteResponse>(`${this.apiUrl}/api/notes/create`, data, { headers: this.headers });
    }

    updateNote(noteId: string, data: UpdateNote): Observable<UpdateNoteResponse>{
        return this.http.put<UpdateNoteResponse>(`${this.apiUrl}/api/notes/${noteId}`, data, { headers: this.headers });
    }

    deleteNote(noteId: string): Observable<DeleteNoteResponse>{
        return this.http.delete<DeleteNoteResponse>(`${this.apiUrl}/api/notes/${noteId}`, { headers: this.headers });
    }

    getAllNotes(caseId: string): Observable<GetAllNotes>{
      return this.http.get<GetAllNotes>(`${this.apiUrl}/api/notes/case/${caseId}`, { headers: this.headers });
    }
}