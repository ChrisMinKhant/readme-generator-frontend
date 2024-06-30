import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  private apiUrl = 'http://localhost:8080/generate';

  header = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  postData(data: any): void {
    this.http.post(this.apiUrl, data, { headers: this.header }).subscribe(
      (data) => {
        console.log('Fetched response data ::: ' + JSON.stringify(data));
      },
      (error: HttpErrorResponse) => {
        console.log('Fetched error response ::: ' + JSON.stringify(error));
      }
    );
  }
}
