import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8081/auth';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/changepassword`, 
      { oldPassword, newPassword }, 
      { headers }
    );
  }
} 