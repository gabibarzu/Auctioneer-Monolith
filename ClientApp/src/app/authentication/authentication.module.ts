import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationService } from '../shared/services/authentication.service';
import { LoginComponent, RegisterComponent } from './';

/** Load icon */
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  UserOutline,
  LockOutline,
  MailOutline,
  LoginOutline,
  UserAddOutline,
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
  UserOutline,
  LockOutline,
  MailOutline,
  LoginOutline,
  UserAddOutline,
];

/** Load nz modules */
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

const nzModules = [
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzNotificationModule,
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...nzModules,
    NzIconModule.forChild(icons),
  ],
})
export class AuthenticationModule {}
