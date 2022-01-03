import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { MyBidsComponent } from './my-bids/my-bids.component';
import { AccountService } from '.';

@NgModule({
  declarations: [MyBidsComponent],
  imports: [CommonModule, AccountRoutingModule],
  providers: [AccountService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountModule {}
