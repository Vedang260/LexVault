import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { CreateCase, CreateCaseResponse, GetAssignedCasesOfLawyerResponse, GetCaseDetails } from '../models/case.model';

@Injectable({
  providedIn: 'root',
})
export class CaseService {
    token = localStorage.getItem('token');
    headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    private apiUrl = `${environment.backendUrl}`; // replace with your API endpoint

  constructor(private http: HttpClient) {}

    createCase(data: CreateCase): Observable<CreateCaseResponse> {
        return this.http.post<CreateCaseResponse>(`${this.apiUrl}/api/case/create`, { createCase: data }, { headers: this.headers });
    }

    getAssignedCasesOfLawyerDashboard(): Observable<GetAssignedCasesOfLawyerResponse>{
      return this.http.get<GetAssignedCasesOfLawyerResponse>(`${this.apiUrl}/api/case/lawyer/assigned`, { headers: this.headers })
    }

    getCaseDetails(caseId: string): Observable<GetCaseDetails>{
      return this.http.get<GetCaseDetails>(`${this.apiUrl}/api/case/case-details/${caseId}`, { headers: this.headers });
    }

//   getArticle(articleId: string): Observable<any> {
//     return this.http.get(`http://localhost:8000/api/articles/${articleId}`, {headers: this.headers});
//   }

//   updateArticle(articleId: string, data: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${articleId}`, data, {headers: this.headers});
//   }

//   uploadImage(formData: FormData): Observable<any> {
//     return this.http.post(`${this.apiUrl}/upload-image`, formData, {headers: this.headers});
//   }

//   generateArticleWithAI(image_url: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/generate`, { image_url }, {headers: this.headers});
//   }

//   deleteArticle(article_id: string): Observable<any>{
//     return this.http.delete(`${this.apiUrl}/${article_id}`, {headers: this.headers});
//   }

}