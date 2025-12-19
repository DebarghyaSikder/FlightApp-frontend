import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserResponse } from '../../models/UserResponse';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = environment.apiBaseUrl + '/api/auth';

  private currentUserSubject = new BehaviorSubject<UserResponse | null>(null);
  currentUser = this.currentUserSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {}

  signin(data: any): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.baseUrl}/login`, data).pipe(
      tap(user => {
        this.saveToken(user.token);
        this.currentUserSubject.next(user);
      }),
      catchError(err => {
        this.errorSubject.next('Login failed');
        return throwError(() => err);
      })
    );
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data).pipe(
      catchError(err => {
        this.errorSubject.next('Signup failed');
        return throwError(() => err);
      })
    );
  }

  clearError() {
    this.errorSubject.next(null);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}
