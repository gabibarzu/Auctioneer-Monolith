import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Product } from '../../../shared/models';
import { SearchCriteria } from '../../shared/models';
import { Category, StartpageService } from '../..';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.less'],
})
export class ProductsContainerComponent implements OnChanges {
  @Input() selectedCategory!: Category;
  @Input() searchText!: string;

  isLoaded = false;
  products: Product[] = [];
  productsSource: Product[] = [];

  constructor(
    private service: StartpageService,
    private notification: NzNotificationService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedCategory'] || changes['searchText']) {
      if (
        (this.selectedCategory && this.selectedCategory.name != 'All') ||
        this.searchText
      ) {
        this.getProductsBySearchCriteria();
      } else {
        this.getProducts();
      }
    }
  }

  private getProducts() {
    this.isLoaded = false;
    this.service.getProducts().subscribe(
      (result) => {
        this.products = result as Product[];
        this.isLoaded = true;
      },
      (response) => {
        this.notification.create('error', 'Error', response.error.message);
        this.isLoaded = true;
      }
    );
  }

  private getProductsBySearchCriteria() {
    this.isLoaded = false;
    const request: SearchCriteria = {
      categoryId: this.selectedCategory
        ? this.selectedCategory.id
        : '00000000-0000-0000-0000-000000000000',
      searchText: this.searchText ?? '',
    };
    this.service.getProductsBySearchCriteria(request).subscribe(
      (result) => {
        this.products = result as Product[];
        this.isLoaded = true;
      },
      (response) => {
        this.notification.create('error', 'Error', response.error.message);
        this.isLoaded = true;
      }
    );
  }
}
