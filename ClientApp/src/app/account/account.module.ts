import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { MyBidsComponent } from './my-bids/my-bids.component';
import { StatComponent } from './shared/components/stat/stat.component';
import { AccountService } from '.';

/** Load icon */
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  ShoppingCartOutline,
  LockOutline,
  MailOutline,
  LoginOutline,
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
  ShoppingCartOutline,
  LockOutline,
  MailOutline,
  LoginOutline,
];

/** Load nz modules */
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { SharedModule } from '../shared/shared.module';

const nzModules = [
  NzGridModule,
  NzDividerModule,
  NzSkeletonModule,
  NzNotificationModule,
  NzResultModule,
  NzEmptyModule,
];

@NgModule({
  declarations: [MyBidsComponent, StatComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    ...nzModules,
    NzIconModule.forChild(icons),
  ],
  providers: [AccountService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountModule {}
