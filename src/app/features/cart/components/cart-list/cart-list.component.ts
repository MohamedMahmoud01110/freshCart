import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart.interface';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  imports: [CartItemComponent,RouterLink],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent {

  cartDetails: Cart={} as Cart;
  private readonly cartService = inject(CartService);
  isLoading : boolean = false;



  loadCart() {
      this.cartService.getLoggedInUserCart().subscribe({
        next: (res) => {
          this.cartDetails = res;
          this.isLoading = true;
          console.log(res);
          ;
        },
        error: (error) => {
          console.error(error);
      }
    });
  }

  removeProduct(productId: string) {
    this.cartService.removeProductFromCart (productId).subscribe({
      next: (res) => {
        this.cartDetails = res;
        this.cartService.cartCounter.set(res.numOfCartItems);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  updateProductQuantity(productId: string, quantity: number) {
    this.cartService.updateCartQuantity(productId, quantity).subscribe({
      next: (res) => {
        this.cartDetails = res;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  clearCart(){
    this.cartService.clearCart().subscribe({
      next: (res) => {
        if( res.message == "success"){
          this.loadCart();
        this.cartService.cartCounter.set(0);

        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  ngOnInit(): void {
    this.loadCart();
  }

}
