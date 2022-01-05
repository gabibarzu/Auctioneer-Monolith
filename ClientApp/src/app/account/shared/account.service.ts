import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Product } from '../../shared/models';
import { AccountStat } from './models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getAccountStat(): Observable<AccountStat> {
    return this.http
      .get(environment.apiUrl + '/Account/GetAccountStat')
      .pipe(map((result) => result as AccountStat));
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get(environment.apiUrl + '/Account/GetProducts')
      .pipe(map((result) => result as Product[]));
  }
}
