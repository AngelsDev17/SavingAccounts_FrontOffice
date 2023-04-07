import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SendMoney } from '../models/send-money-model';
import { History } from '../models/history-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  getAccountAmount(): Observable<number> {
    return this.httpClient.get<number>('http://localhost:9000/api/account/get-account-amount')
                          .pipe(map(res => res));
  }

  getAccountHistory(): Observable<History[]> {
    return this.httpClient.get<History[]>('http://localhost:9000/api/account/get-account-history')
                          .pipe(map(res => res));
  }

  sendMoney(sendMoney: SendMoney): Observable<any> {
    return this.httpClient.post<any>('http://localhost:9000/api/account/send-money', sendMoney)
                          .pipe(map(res => res));
  }

  withdrawMoney(amount: number): Observable<any> {
    return this.httpClient.post<any>('http://localhost:9000/api/account/withdraw-money', amount)
                          .pipe(map(res => res));
  }

}
