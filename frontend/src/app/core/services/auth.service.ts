// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Role } from '../constants/role.enum';
import { environment } from '../../../../environment/environment';

interface User {
    id: string;
    username: string;
    email: string;
    role: Role
}

interface AuthResponse {
    success: boolean,
    message: string,
    token: string;
    user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.backendUrl}`;
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;

    private tokenSubject: BehaviorSubject<string | null>;
    public token: Observable<string | null>;

    constructor(private http: HttpClient, private router: Router) {
        // Initialize from localStorage if available
        const storedUser = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User | null>(
        storedUser ? JSON.parse(storedUser) : null
        );
        this.currentUser = this.currentUserSubject.asObservable();

        const storedToken = localStorage.getItem('token');
        this.tokenSubject = new BehaviorSubject<string | null>(storedToken);
        this.token = this.tokenSubject.asObservable();
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    public get tokenValue(): string | null {
        return this.tokenSubject.value;
    }

    login(credentials: { email: string; password: string }): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/login`, credentials).pipe(
        tap(response => {
            // Store user details and token in localStorage
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);
            
            // Update observables
            this.currentUserSubject.next(response.user);
            this.tokenSubject.next(response.token);
        }),
        catchError(error => {
            console.error('Login error:', error);
            return throwError(error);
        })
        );
    }

    logout(): void {
        // Remove user data from localStorage
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        
        // Update observables
        this.currentUserSubject.next(null);
        this.tokenSubject.next(null);
        
        // Navigate to login page
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return !!this.tokenValue;
    }
}