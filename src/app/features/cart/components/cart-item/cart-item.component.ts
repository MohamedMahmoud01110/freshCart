import { Component, Input, input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/cart.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() product: Product = {} as Product;
  @Output() removeProduct = new EventEmitter<string>();
  @Output() updateProductQuantity = new EventEmitter<{id: string, quantity: number}>();
  @Output() clearCart = new EventEmitter();

  onRemoveProduct(){
    this.removeProduct.emit(this.product.product._id);
  }
  onUpdateQuantity(quantity: number){
    this.updateProductQuantity.emit({id: this.product.product._id, quantity});
  }




}
