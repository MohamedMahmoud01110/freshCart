import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from './../../models/product';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  ProductID !:string | null;
  productDetails :Product = {} as Product
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productService = inject(ProductsService);

  getProductID(){
    this.activatedRoute.paramMap.subscribe({
      next: (urlData) => {
        this.ProductID = urlData.get('id');
        }
    })
    // this.activatedRoute.snapshot.paramMap.get('id');
    // return this.activatedRoute.snapshot.params['id']; //this works only once

  }

  getProductDetails(id : string|null) {
    this.productService.getProductDetails(id).subscribe({
      next: ({data}) => {
        this.productDetails = data;
      }
    })
  }


  ngOnInit(): void {

    this.getProductID();
    this.getProductDetails(this.ProductID);
  }

}
