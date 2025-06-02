import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { CreateTimeEntry, GetAllTimeEntries, Response, UpdateTimeEntry } from '../models/timeEntry.model';

@Injectable({
  providedIn: 'root',
})
export class TimeEntryService {
    token = localStorage.getItem('token');
    headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    private apiUrl = `${environment.backendUrl}`; // replace with your API endpoint

  constructor(private http: HttpClient) {}

    createTimeEntry(data: CreateTimeEntry): Observable<Response> {
        return this.http.post<Response>(`${this.apiUrl}/api/time-entry/create`, data, { headers: this.headers });
    }

    updateTimeEntry(timeEntryId: any, data: UpdateTimeEntry): Observable<Response>{
        return this.http.put<Response>(`${this.apiUrl}/api/time-entry/${timeEntryId}`, data, { headers: this.headers });
    }

    deletTimeEntry(noteId: string): Observable<Response>{
        return this.http.delete<Response>(`${this.apiUrl}/api/time-entry/${noteId}`, { headers: this.headers });
    }

    getAllTimeEntries(caseId: string): Observable<GetAllTimeEntries>{
      return this.http.get<GetAllTimeEntries>(`${this.apiUrl}/api/time-entry/${caseId}`, { headers: this.headers });
    }
}