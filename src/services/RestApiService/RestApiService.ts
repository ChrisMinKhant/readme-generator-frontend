import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  private apiUrl = 'http://localhost:8080/generate';

  constructor(private http: HttpClient) {}

  postData(data: any): Observable<any> {
    const header = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiUrl, data, { headers: header });
  }
}
