// Create a simple test interceptor
import { Injectable, Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TestInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Test Interceptor: Request intercepted!');
    return next.handle(request);
  }
}

export const testInterceptProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TestInterceptor,
  multi: true,
};