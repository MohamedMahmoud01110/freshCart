import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {


  defaultLang = 'en';



  constructor( private translateService: TranslateService, @Inject(PLATFORM_ID) private platformId: Object) {
    //1- get the default language from the browser if exists
    if (isPlatformBrowser(this.platformId)){
      const saveLang =localStorage.getItem('lang');
      if(saveLang){
        this.defaultLang = saveLang;
      }
      //2- set the default language
      this.translateService.setDefaultLang(this.defaultLang);
      //3- use the current language
      this.translateService.use(this.defaultLang);
    }
    this.changeDirection(this.defaultLang);
  }


  //4- change the language
  changeLang(lang: string) {
    this.translateService.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
    }
    this.changeDirection(lang);
  }
  //5- changing the direction of the page
  changeDirection(lang :string) {
      if (lang === 'ar' && isPlatformBrowser(this.platformId)) {
        // document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
      } else if (lang === 'en' && isPlatformBrowser(this.platformId)) {
        // document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
      }
    }
}

