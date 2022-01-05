import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less'],
})
export class NavigationComponent {
  constructor(
    private service: AuthenticationService,
    private notification: NzNotificationService
  ) {
    this.isLoggedIn = this.service.isLoggedIn();
  }

  isLoggedIn!: Observable<boolean>;

  logout() {
    this.service.logout().subscribe(
      (result: any) => {},
      (response) => {
        this.notification.create('error', 'Error', response.error.message);
      }
    );
  }
}
