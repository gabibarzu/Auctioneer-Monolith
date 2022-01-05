import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Product } from '../../shared/models';
import { AccountStat } from '../shared/models';
import { AccountService } from '..';

@Component({
  selector: 'app-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.less'],
})
export class MyBidsComponent implements OnInit {
  constructor(
    private readonly service: AccountService,
    private readonly notification: NzNotificationService
  ) {}

  isStatLoaded = false;
  areProductsLoaded = false;
  accountStat!: AccountStat;
  products!: Product[];

  ngOnInit(): void {
    this.getAccountStat();
    this.getProducts();
  }

  getAccountStat(): void {
    this.service.getAccountStat().subscribe(
      (accountStat) => {
        this.accountStat = accountStat;
        this.isStatLoaded = true;
      },
      (error) => {
        this.notification.create('error', 'Error', error.message);
        this.isStatLoaded = false;
      }
    );
  }

  getProducts(): void {
    this.service.getProducts().subscribe(
      (products) => {
        this.products = products;
        this.areProductsLoaded = true;
      },
      (error) => {
        this.notification.create('error', 'Error', error.message);
        this.areProductsLoaded = false;
      }
    );
  }
}
