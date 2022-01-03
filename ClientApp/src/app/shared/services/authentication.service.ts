import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login, Register } from '../../authentication/shared/models';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  login(model: Login) {
    return this.http
      .post(environment.apiUrl + '/Authentication/Login', model)
      .pipe(
        map(
          (result: any) => {
            this.isLoginSubject.next(true);
            localStorage.setItem('token', result.token);
            localStorage.setItem('id', result.id);
            this.router.navigate(['/startpage']);
            return result;
          },
          (error: any) => {
            return error;
          }
        )
      );
  }

  register(model: Register) {
    return this.http.post(
      environment.apiUrl + '/Authentication/Register',
      model
    );
  }

  logout() {
    return this.http.get(environment.apiUrl + '/Authentication/Logout').pipe(
      map(
        (result: any) => {
          this.isLoginSubject.next(false);
          localStorage.removeItem('token');
          this.router.navigate(['/authentication/login']);
          return result;
        },
        (error: any) => {
          return error;
        }
      )
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
