import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient , private router: Router) { }
  private id = inject(PLATFORM_ID);

  register(data : any) {
    return this.httpClient.post(environment.baseUrl+'auth/signup', data);
  }

  login(data : any) {
    return this.httpClient.post(environment.baseUrl+'auth/signin', data);

  }
  decodeToken(){
    try{
      if(isPlatformBrowser(this.id)) {
        const decoded = jwtDecode(localStorage.getItem('token')!);
        console.log(decoded);
      }
    }catch{
      this.logOut();
    }
  }


  saveToken(token : string) : void {
    if(isPlatformBrowser(this.id)){
      localStorage.setItem('token', token);
    }
  }


  getToken() : string | null {
    if(isPlatformBrowser(this.id)) {
      return localStorage.getItem('token');
    }
    return null;
  }


  isAuthenticated()  : boolean {
    if(isPlatformBrowser(this.id)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  logOut(){
    if(isPlatformBrowser(this.id)) {
      this.router.navigate(['/login']);
      localStorage.clear();
    }
  }
}
