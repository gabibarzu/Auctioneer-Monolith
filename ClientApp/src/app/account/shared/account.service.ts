import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getAllBidProducts() {
    return this.http.get(environment.apiUrl + '/Product/GetAllBidProducts');
  }
}
