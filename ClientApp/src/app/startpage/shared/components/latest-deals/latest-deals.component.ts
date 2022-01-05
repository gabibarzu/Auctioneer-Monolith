import { Component, Input } from '@angular/core';
import { Product } from '../../../../shared/models';

@Component({
  selector: 'app-latest-deals',
  templateUrl: './latest-deals.component.html',
  styleUrls: ['./latest-deals.component.less'],
})
export class LatestDealsComponent {
  @Input() deals!: Product[];
}
