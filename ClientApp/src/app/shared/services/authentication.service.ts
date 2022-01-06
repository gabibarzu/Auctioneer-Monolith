import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login, Register } from '../../authentication/shared/models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiUrl: string;
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.apiUrl = baseUrl + 'api';
  }

  login(model: Login) {
    return this.http.post(this.apiUrl + '/Authentication/Login', model).pipe(
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
    return this.http.post(this.apiUrl + '/Authentication/Register', model);
  }

  logout() {
    return this.http.get(this.apiUrl + '/Authentication/Logout').pipe(
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
