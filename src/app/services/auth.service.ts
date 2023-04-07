import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { AuthCredentials } from '../models/auth-credentials-model';
import { Account } from '../models/account-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  
  login(creds: AuthCredentials) {
    return this.http.post('http://localhost:9000/login', creds, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const headers = response.headers;
      const body = response.body;

      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken.replace('Bearer ', '');

      localStorage.setItem('bearerToken', token);

      return body;
    }));
  }

  generateAccount(account: Account) {
    return this.http.post('http://localhost:9000/api/account/generate-user-and-account', account);
  }

}
