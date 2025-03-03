import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http'; // Correct HttpClient import
import { JwtInterceptor } from './jwt.interceptor';
import { AuthenticationService } from '../services/authentication.service';
import { of } from 'rxjs';

describe('JwtInterceptor', () => {
    let httpMock: HttpTestingController;
    let authenticationService: AuthenticationService;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthenticationService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: JwtInterceptor,
                    multi: true,
                },
            ],
        });
        httpMock = TestBed.inject(HttpTestingController);
        authenticationService = TestBed.inject(AuthenticationService);
        httpClient = TestBed.inject(HttpClient);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should add Authorization header when logged in', () => {
        spyOn(authenticationService, 'isLoggedIn').and.returnValue(true);
        spyOn(authenticationService, 'getToken').and.returnValue('testToken');

        const dummyRequest = new HttpRequest('GET', '/test');
        const next: HttpHandler = {
            handle: (req: HttpRequest<any>) => {
                expect(req.headers.get('Authorization')).toBe('Bearer testToken');
                return of(new HttpResponse({ status: 200 }));
            },
        };

        const interceptor = TestBed.inject(JwtInterceptor);
        interceptor.intercept(dummyRequest, next).subscribe();
    });

    it('should not add Authorization header when not logged in', () => {
        spyOn(authenticationService, 'isLoggedIn').and.returnValue(false);

        const dummyRequest = new HttpRequest('GET', '/test');
        const next: HttpHandler = {
            handle: (req: HttpRequest<any>) => {
                expect(req.headers.get('Authorization')).toBeNull();
                return of(new HttpResponse({ status: 200 }));
            },
        };

        const interceptor = TestBed.inject(JwtInterceptor);
        interceptor.intercept(dummyRequest, next).subscribe();
    });
});