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
    const token = this.authservice.getToken();
    return this.http.post(environment.baseUrl + 'cart', {
      productId: id,
    },
    {
      headers: token ? { token } : {}
    });
  }

  updateCartQuantity(id: string, count: number):Observable<any> {
    const token = this.authservice.getToken();
    return this.http.put(environment.baseUrl + 'cart/'+ id, {
      count
    },
    {
      headers: token ? { token } : {}
    });
  }

  getLoggedInUserCart():Observable<any>{
    const token = this.authservice.getToken();
    return this.http.get(environment.baseUrl + 'cart/',
    {
      headers: token ? { token } : {}
    });
  }

  removeProductFromCart(id: string):Observable<any> {
    const token = this.authservice.getToken();
    return this.http.delete(environment.baseUrl + 'cart/' + id,
    {
      headers: token ? { token } : {}
    });
  }

  clearCart():Observable<any> {
    const token = this.authservice.getToken();
    return this.http.delete(environment.baseUrl + 'cart',
    {
      headers: token ? { token } : {}
    });
  }
}
