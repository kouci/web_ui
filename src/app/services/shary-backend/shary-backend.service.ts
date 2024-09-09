import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Competence } from '../../models/competence-data.model';

@Injectable({
  providedIn: 'root'
})
export class SharyBackendService {

  private apiUrl = "http://localhost:8080/api/";

  constructor(private http: HttpClient) { }

  getAllCompetences(): Observable<Array<Competence>> {
    const url = this.apiUrl + "competences";
    return this.http.get<Array<Competence>>(url)
      .pipe(
        tap(competences => console.log('Fetched competences:', competences))
      );
  }
}
