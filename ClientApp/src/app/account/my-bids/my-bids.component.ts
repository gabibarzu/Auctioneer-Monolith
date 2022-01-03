import { Component, OnInit } from '@angular/core';
import { AccountService } from '..';

@Component({
  selector: 'app-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.less'],
})
export class MyBidsComponent implements OnInit {
  constructor(private service: AccountService) {}

  ngOnInit(): void {
    this.service.getAllBidProducts().subscribe(
      (result) => {
        console.log(result);
      },
      (response) => {
        // this.notification.create('error', 'Error', response.error.message);
      }
    );
  }
}
