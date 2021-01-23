import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take } from 'rxjs/internal/operators/take';
import { exhaustMap } from 'rxjs/internal/operators/exhaustMap';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(request);
        }

        const modifiedRequest = request.clone({
          headers: new HttpHeaders().set(
            'Authorization',
            'bearer ' + user.message
          ),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
