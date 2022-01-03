import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private readonly router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('token') != null) {
      const clonedRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
      });
      return next.handle(clonedRequest).pipe(
        tap(
          (success) => {},
          (error) => {
            if (error.status === 401) {
              localStorage.removeItem('token');
              this.router.navigate(['/authentication/login']);
            } else {
              if (error.status === 403) {
                this.router.navigate(['/forbidden']);
              }
            }
          }
        )
      );
    } else {
      return next.handle(request.clone());
    }
  }
}
