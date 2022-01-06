import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

/** Load icons **/
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [UserOutline];

/** Load nz modules */
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { RouterModule } from '@angular/router';

const nzModules = [
  NzMenuModule,
  NzNotificationModule,
  NzButtonModule,
  NzResultModule,
  NzGridModule,
  NzCardModule,
];

@NgModule({
  declarations: [
    NavigationComponent,
    PageNotFoundComponent,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ...nzModules,
    NzIconModule.forChild(icons),
  ],
  exports: [NavigationComponent, PageNotFoundComponent, ProductCardComponent],
})
export class SharedModule {}
