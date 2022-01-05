import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StartpageRoutingModule } from './startpage-routing.module';

import { HomeComponent } from './home/home.component';
import { CategoriesFilterComponent } from './home/categories-filter/categories-filter.component';
import { ProductsContainerComponent } from './home/products-container/products-container.component';

import { ProductComponent } from './product/product.component';
import { ProductNotFoundComponent } from './product/product-not-found/product-not-found.component';

import { CountDownComponent } from './shared/components/count-down/count-down.component';
import { LatestDealsComponent } from './shared/components/latest-deals/latest-deals.component';
import { StartpageService } from './shared/startpage.service';

/** Load icon */
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  SearchOutline,
  AppstoreOutline,
  CameraOutline,
  SkinOutline,
  ExperimentOutline,
  CarOutline,
  TrophyOutline,
  HomeOutline,
  ClockCircleOutline,
  MinusOutline,
  PlusOutline,
  EuroOutline,
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
  SearchOutline,
  AppstoreOutline,
  CameraOutline,
  SkinOutline,
  ExperimentOutline,
  CarOutline,
  TrophyOutline,
  HomeOutline,
  ClockCircleOutline,
  MinusOutline,
  PlusOutline,
  EuroOutline,
];

/** Load nz modules */
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { SharedModule } from '../shared/shared.module';

const nzModules = [
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzNotificationModule,
  NzSkeletonModule,
  NzDividerModule,
  NzEmptyModule,
  NzCardModule,
  NzImageModule,
  NzTabsModule,
  NzInputNumberModule,
  NzResultModule,
  NzTableModule,
  NzPopoverModule,
];

@NgModule({
  declarations: [
    HomeComponent,
    CategoriesFilterComponent,
    ProductsContainerComponent,
    CountDownComponent,
    ProductComponent,
    ProductNotFoundComponent,
    LatestDealsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StartpageRoutingModule,
    SharedModule,
    ...nzModules,
    NzIconModule.forChild(icons),
  ],
  providers: [StartpageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StartpageModule {}
