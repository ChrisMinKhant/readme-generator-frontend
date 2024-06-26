import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  constructor(private httpClient: HttpClient) {}

  metaData: any = {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  submitReadMeInfoForm(readMeInfo: any) {
    let backendEndpointUrl: string = 'http://localhost:8080/generate';
    console.log(JSON.stringify(readMeInfo));
  }
}
