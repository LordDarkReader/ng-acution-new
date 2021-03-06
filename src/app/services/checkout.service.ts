import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Purchase} from 'src/app/common/purchase';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {PaymentInfo} from 'src/app/common/payment-info';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = environment.devApiUrl + '/checkout/purchase';
  private paymentIntentUrl = environment.devApiUrl + '/checkout/payment-intent';

  constructor(private httpClient: HttpClient) {
  }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }

  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any> {
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
  }
}
