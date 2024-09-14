import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Competence } from '../../models/competence-data.model';
import { UserData } from 'src/app/models/user-data.model';
import {Response} from 'src/app/models/response-data.model';

@Injectable({
  providedIn: 'root'
})
export class SharyBackendService {

  private apiUrl = "http://localhost:8080/api/";

  constructor(private http: HttpClient) { }

  // Fonction pour récupérer le token depuis le localStorage
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Fonction pour créer les en-têtes avec le token
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllCompetences(): Observable<Array<Competence>> {
    const url = this.apiUrl + "competences";
   // const headers = this.getAuthHeaders();
    return this.http.get<Array<Competence>>(url)
      .pipe(
        tap(competences => console.log('Fetched competences:', competences))
      );
  }

  getUserById(id: any): Observable<UserData> {
    const url = this.apiUrl + "users/" + id;
    const headers = this.getAuthHeaders();
    return this.http.get<UserData>(url, { headers });
  }

  patchUser(user: UserData): Observable<Response>{
    const url = this.apiUrl + "users/" + localStorage.getItem("id");
    const headers = this.getAuthHeaders()
    return this.http.put<Response>(url,user, {headers} )
  }
}

