import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../../shared/models';
import { AccountStat } from './models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  apiUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl + 'api';
  }

  getAccountStat(): Observable<AccountStat> {
    return this.http
      .get(this.apiUrl + '/Account/GetAccountStat')
      .pipe(map((result) => result as AccountStat));
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get(this.apiUrl + '/Account/GetProducts')
      .pipe(map((result) => result as Product[]));
  }
}
