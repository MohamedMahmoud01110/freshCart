import { TranslationService } from './../../../core/services/translation.service';
import { Component, computed, inject, Input, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() layout!: string;
  private readonly auth = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly  id = inject(PLATFORM_ID);
  private readonly translationService = inject(TranslationService);
  lang = '';
  navbarCounter = computed(() => this.cartService.cartCounter());
  // lang = localStorage.getItem('lang') || 'en';

  // isDarkMode = false;

  // ngOnInit() {
  //   this.checkDarkMode();
  //   this.watchDarkModeChanges();
  // }

  // checkDarkMode() {
  //   this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // }

  // watchDarkModeChanges() {
  //   window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  //     this.isDarkMode = event.matches;
  //   });
  // }


  ngOnInit(): void {
    if(isPlatformBrowser(this.id)) {
      this.lang = localStorage.getItem('lang') || 'en';
    }
    this.auth.decodeToken();
    // this.cartService.cartCounter.subscribe({
    //   next: (value) => {
    //     this.navbarCounter = value;
    //   }
    // });
    if(isPlatformBrowser(this.id)) {
    this.cartService.getLoggedInUserCart().subscribe({
      next: (res) => {
        this.cartService.cartCounter.set(res.numOfCartItems);
      }
    });
  }
}


  logOut(){
    this.auth.logOut();
  }


  selectLang(lang: string) {
    this.translationService.changeLang(lang);
    this.lang = lang;
  }

}
