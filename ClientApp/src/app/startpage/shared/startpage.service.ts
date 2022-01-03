import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bid, LatestDeals, SearchCriteria } from './models';

@Injectable({
  providedIn: 'root',
})
export class StartpageService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(environment.apiUrl + '/Category/');
  }

  getProducts() {
    return this.http.get(environment.apiUrl + '/Product/');
  }

  getProductById(productId: string) {
    return this.http.get(environment.apiUrl + '/Product/' + productId);
  }

  getProductsBySearchCriteria(request: SearchCriteria) {
    return this.http.post(environment.apiUrl + '/Product/', request);
  }

  getLatestDealsForCategory(request: LatestDeals) {
    return this.http.post(environment.apiUrl + '/Deals/LatestDeals/', request);
  }

  getCurrentBidValue(productId: string) {
    return this.http.get(
      environment.apiUrl + '/Bid/GetCurrentBidValue/' + productId
    );
  }

  getAllBidsForProduct(productId: string) {
    return this.http.get(
      environment.apiUrl + '/Bid/GetAllBidsForProduct/' + productId
    );
  }

  bid(bid: Bid) {
    return this.http.post(environment.apiUrl + '/Bid/Bid/', bid);
  }

  buy(bid: Bid) {
    return this.http.post(environment.apiUrl + '/Bid/Buy/', bid);
  }
}
