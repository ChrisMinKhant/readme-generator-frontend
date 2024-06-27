import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  constructor(private http: HttpClient) {}

  metaData: any = {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  submitReadMeInfoForm(readMeInfo: any): void {
    let backendEndpointUrl: string = 'http://localhost:8080/generate';
    console.log(
      'Fetched submitted readMeInfo ::: ' + JSON.stringify(readMeInfo)
    );

    this.http.post(backendEndpointUrl, readMeInfo, this.metaData).subscribe(
      (response) => {
        console.log('POST request successful:', response);
      },
      (error) => {
        console.error('Error during POST request:', error);
      }
    );
  }
}
