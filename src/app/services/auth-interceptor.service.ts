import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {OktaAuthService} from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private oktaAuth: OktaAuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(req, next));
  }

  private async handleAccess(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    const securedEndpoints = ['http://localhost:8080/api/orders'];
    if (securedEndpoints.some(url => req.urlWithParams.includes(url))) {

      const accessToken = await this.oktaAuth.getAccessToken();

      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
          }
      });
    }
    return next.handle(req).toPromise();
  }
}
