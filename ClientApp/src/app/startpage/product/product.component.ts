import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Bid, ProductStatus, Product } from '../../shared/models';
import { LatestDeals } from '../shared/models';
import { StartpageService } from '../shared/startpage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less'],
})
export class ProductComponent implements OnInit {
  isLoaded = false;
  product!: Product;
  latestDeals!: Product[];
  bids!: Bid[];
  newBid = 1;
  currentBid = 1;
  status = ProductStatus;

  formatterEuro = (value: number) => `€ ${value}`;
  parserEuro = (value: string) => value.replace('€ ', '');

  constructor(
    private route: ActivatedRoute,
    private service: StartpageService,
    private sanitizer: DomSanitizer,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.refreshPage();
  }

  refreshPage(): void {
    this.route.url.subscribe((url) => {
      this.getProduct();
    });
  }

  getProduct(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('productId') as string;

    if (productIdFromRoute) {
      this.service.getProductById(productIdFromRoute).subscribe(
        (result) => {
          this.product = result as Product;
          this.isLoaded = true;
          this.getLatestDeals();
          this.getCurrentBidValue();
          this.getAllBidsForProduct();
        },
        (response) => {
          this.notification.create('error', 'Error', response.error.message);
          this.isLoaded = true;
        }
      );
    }
  }

  getLatestDeals(): void {
    const request: LatestDeals = {
      productId: this.product.id,
      categoryId: this.product.categoryId,
    };
    this.service.getLatestDealsForCategory(request).subscribe(
      (result) => {
        this.latestDeals = result as Product[];
      },
      (response) => {
        this.notification.create('error', 'Error', response.error.message);
      }
    );
  }

  getCurrentBidValue(): void {
    this.service.getCurrentBidValue(this.product.id).subscribe(
      (result) => {
        this.currentBid = result as number;
        this.newBid = result as number;
      },
      (response) => {
        this.notification.create('error', 'Error', response.error.message);
      }
    );
  }

  getAllBidsForProduct(): void {
    this.service.getAllBidsForProduct(this.product.id).subscribe(
      (result) => {
        this.bids = result as Bid[];
        this.bids.forEach(function (item, index) {
          item.id = index + 1;
        });
      },
      (response) => {
        this.notification.create('error', 'Error', response.error.message);
      }
    );
  }

  bid(): void {
    const bid = {
      userId: this.userId,
      productId: this.product.id,
      value: this.newBid,
    } as Bid;
    this.service.bid(bid).subscribe(
      (result) => {
        this.notification.create('success', 'Success', 'Bid was made!', {
          nzDuration: 2000,
        });
        this.getCurrentBidValue();
        this.getAllBidsForProduct();
      },
      (response) => {
        this.notification.create('error', 'Error', response.error.message);
      }
    );
  }

  buy(): void {
    const bid = {
      userId: this.userId,
      productId: this.product.id,
      value: this.product.instantPrice,
    } as Bid;
    this.service.buy(bid).subscribe(
      (result) => {
        this.notification.create(
          'success',
          'Success',
          'You bought this product!',
          {
            nzDuration: 2000,
          }
        );
        this.getProduct();
      },
      (response) => {
        this.notification.create('error', 'Error', response.error.message);
      }
    );
  }

  getImage(product: Product): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${product.image}`
    );
  }

  get showBuySection(): boolean {
    if (
      this.product &&
      this.currentBid &&
      this.currentBid > this.product.instantPrice
    ) {
      return false;
    }
    return true;
  }

  get userId(): string {
    return localStorage.getItem('id') ?? '';
  }

  isHighestBid(): boolean {
    return (
      this.bids &&
      this.bids.length > 0 &&
      this.bids.reduce((max, bid) => (max.value > bid.value ? max : bid))
        .userId == this.userId
    );
  }

  getUserDetails(userId: string): string {
    return this.userId === userId ? 'You' : 'Anonymous';
  }
}
