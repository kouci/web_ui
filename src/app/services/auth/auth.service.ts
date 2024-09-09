import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserData } from '../../models/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "http://localhost:8080/api/auth/";

  constructor(private http: HttpClient) { }

  register(userData: UserData): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.apiUrl + "register";
    return this.http.post(url, userData, { headers });
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.apiUrl + "login";
    
    return this.http.post(url, { username, password }, { headers })
      .pipe(
        tap((response: any) => {
          const token = response.token;
          if (token) {
            console.log("teeesstttt")
            localStorage.setItem('jwt', token);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('jwt');
  }
}
