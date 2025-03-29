import { Data } from './../../../cart/models/cart.interface';
import { CartService } from './../../../cart/services/cart.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ToastrService } from 'ngx-toastr';
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { SearchPipe } from '../../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent,SearchPipe,FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  allProducts : Product[] = []

  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);

  searchTerm: string = '';
  getAllProducts(){
    this.productsService.getProducts().subscribe({
      next: (res) => {

        this.allProducts = res.data
      }
    })
  }


  ngOnInit(): void {
    this.getAllProducts();
  }

  showToastr(msg: string): void {
    this.toastr.success(msg,"",{progressBar:true , timeOut: 1500,positionClass: 'toast-top-right'});
  }


  addProductToCart(id:string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log('Product added to cart');
        console.log(res);
        this.showToastr('Product added successfully');
        // this.cartService.cartCounter.next(res.numOfCartItems);
        this.cartService.cartCounter.set(res.numOfCartItems);

      },
      error: (err) => {
        console.error(err);
      }
    });
  }


}
