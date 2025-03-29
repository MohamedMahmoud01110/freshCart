import { Component, inject } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css'
})
export class MainSliderComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
}

// export class MainSliderComponent {
//   customOptions: OwlOptions = {
//     loop: true,
//     autoplay: true,
//     autoplayTimeout: 3000,
//     autoplayHoverPause: true,
//     nav: true,
//     dots: true,
//     navText: ['<', '>'],
//     mouseDrag: true,
//     touchDrag: true,
//     pullDrag: false,
//     smartSpeed: 1000,
//     animateIn: 'fadeIn',
//     animateOut: 'fadeOut',
//     margin: 10,
//     // stagePadding: 50,
//     responsive: {
//       0: { items: 1 },
//       600: { items: 1 },
//       1000: { items: 1 }
//     },
//     rtl: false
//   }
// }
