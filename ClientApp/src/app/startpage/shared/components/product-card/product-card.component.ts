import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from '../../models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less'],
})
export class ProductCardComponent {
  constructor(private readonly sanitizer: DomSanitizer) {}

  @Input() product!: Product;

  getImage(product: Product) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${product.image}`
    );
  }
}
