import { Injectable, Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptor::URL', request.url);

    const isAuthAPI = request.url.includes('login') || request.url.includes('register');
    console.log('isAuthAPI:', isAuthAPI);

    console.log('Is Logged In:', this.authenticationService.isLoggedIn()); // Check isLoggedIn()

    if (this.authenticationService.isLoggedIn() && !isAuthAPI) {
      console.log('User is logged in and not an auth API call.');
      const token = this.authenticationService.getToken();
      console.log('Retrieved Token:', token); // Check the retrieved token

      if (token) {
        const authReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Modified Request:', authReq);
        return next.handle(authReq);
      } else {
        console.log('Token is null or undefined.');
      }
    } else {
      console.log('User is not logged in or is an auth API call.');
    }

    return next.handle(request);
  }
}

export const authInterceptProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true,
};