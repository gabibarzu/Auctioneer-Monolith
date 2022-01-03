import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models';

@Component({
  selector: 'app-latest-deals',
  templateUrl: './latest-deals.component.html',
  styleUrls: ['./latest-deals.component.less'],
})
export class LatestDealsComponent {
  @Input() deals!: Product[];
}
