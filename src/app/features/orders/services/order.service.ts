import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private auth : AuthService) { }


  createCheckOut(cartId : string | null, shippingAddress: {details : string, phone : string, city : string}): Observable<any> {
    const returnUrl = "?url=http://localhost:4200";
    return this.http.post(environment.baseUrl + 'orders/checkout-session/'+ cartId + returnUrl,
      {
        shippingAddress
      },
      {
        headers: {
          token: this.auth.getToken()!
        }
      })
    }
  }




