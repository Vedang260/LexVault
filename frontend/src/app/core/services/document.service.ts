import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { CreateNote, CreateNoteResponse, DeleteNoteResponse, GetAllNotes, UpdateNote, UpdateNoteResponse } from '../models/note.model';
import { GetAllDocumentsResponse, GetAllTagResponse } from '../models/document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
    token = localStorage.getItem('token');
    headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    private apiUrl = `${environment.backendUrl}`; // replace with your API endpoint

    constructor(private http: HttpClient) {}

    createNewDocument(data: CreateNote): Observable<CreateNoteResponse> {
        return this.http.post<CreateNoteResponse>(`${this.apiUrl}/api/documents/create`, data, { headers: this.headers });
    }

    updateDocument(noteId: any, data: UpdateNote): Observable<UpdateNoteResponse>{
        return this.http.put<UpdateNoteResponse>(`${this.apiUrl}/api/notes/${noteId}`, data, { headers: this.headers });
    }

    deleteDocument(noteId: string): Observable<DeleteNoteResponse>{
        return this.http.delete<DeleteNoteResponse>(`${this.apiUrl}/api/notes/${noteId}`, { headers: this.headers });
    }

    getAllCaseRelatedDocuments(caseId: string): Observable<GetAllDocumentsResponse>{
      return this.http.get<GetAllDocumentsResponse>(`${this.apiUrl}/api/documents/${caseId}`, { headers: this.headers });
    }

    getAllTags(): Observable<GetAllTagResponse>{
        return this.http.get<GetAllTagResponse>(`${this.apiUrl}/api/tags`, { headers: this.headers });
    }
}