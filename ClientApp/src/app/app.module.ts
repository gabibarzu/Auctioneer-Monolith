import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

import { AuthenticationService } from './shared/services/authentication.service';
import { AuthenticationInterceptor } from './shared/services/authentication.interceptor';

/** config angular i18n */
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

/** config ng-zorro-antd i18n */
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

/** Load icons **/
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [UserOutline];

/** Load nz modules */
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzGridModule } from 'ng-zorro-antd/grid';

const nzModules = [
  NzLayoutModule,
  NzMenuModule,
  NzNotificationModule,
  NzButtonModule,
  NzResultModule,
  NzGridModule,
];

@NgModule({
  declarations: [AppComponent, NavigationComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ...nzModules,
    NzIconModule.forChild(icons),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
