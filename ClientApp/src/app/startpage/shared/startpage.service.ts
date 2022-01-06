import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Bid } from '../../shared/models';
import { LatestDeals, SearchCriteria } from './models';

@Injectable({
  providedIn: 'root',
})
export class StartpageService {
  apiUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl + 'api';
  }

  getCategories() {
    return this.http.get(this.apiUrl + '/Category/');
  }

  getProducts() {
    return this.http.get(this.apiUrl + '/Product/');
  }

  getProductById(productId: string) {
    return this.http.get(this.apiUrl + '/Product/' + productId);
  }

  getProductsBySearchCriteria(request: SearchCriteria) {
    return this.http.post(this.apiUrl + '/Product/', request);
  }

  getLatestDealsForCategory(request: LatestDeals) {
    return this.http.post(this.apiUrl + '/Deals/LatestDeals/', request);
  }

  getCurrentBidValue(productId: string) {
    return this.http.get(this.apiUrl + '/Bid/GetCurrentBidValue/' + productId);
  }

  getAllBidsForProduct(productId: string) {
    return this.http.get(
      this.apiUrl + '/Bid/GetAllBidsForProduct/' + productId
    );
  }

  bid(bid: Bid) {
    return this.http.post(this.apiUrl + '/Bid/Bid/', bid);
  }

  buy(bid: Bid) {
    return this.http.post(this.apiUrl + '/Bid/Buy/', bid);
  }
}
