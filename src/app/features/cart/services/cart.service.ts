import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/auth/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { sign } from 'node:crypto';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // cartCounter : BehaviorSubject<number> = new BehaviorSubject(0);
  cartCounter: WritableSignal<number> = signal<number>(0);
  constructor(private http: HttpClient,private authservice:AuthService) {}


  addProductToCart(id: string) :Observable<any> {
    return this.http.post(environment.baseUrl + 'cart', {
      productId: id,
    },
    {
      headers: {
        token: this.authservice.getToken()!
      }
    });
  }

  updateCartQuantity(id: string, count: number):Observable<any> {
    return this.http.put(environment.baseUrl + 'cart/'+ id, {
      count
    },
    {
      headers: {
        token: this.authservice.getToken()!
      }
    });
  }

  getLoggedInUserCart():Observable<any>{
    return this.http.get(environment.baseUrl + 'cart/',
    {
      headers: {
        token: this.authservice.getToken()!
      }
    });
  }

  removeProductFromCart(id: string):Observable<any> {
    return this.http.delete(environment.baseUrl + 'cart/' + id,
    {
      headers: {
        token: this.authservice.getToken()!
      }
    });
  }

  clearCart():Observable<any> {
    return this.http.delete(environment.baseUrl + 'cart',
    {
      headers: {
        token: this.authservice.getToken()!
      }
    });
  }
}
