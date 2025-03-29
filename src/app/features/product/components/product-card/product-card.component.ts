import { Component, EventEmitter, inject, Input, Output, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from './../../../cart/services/cart.service';
import { DatePipe } from '@angular/common';
import { StockStatusPipe } from '../../../../shared/pipes/stock-status.pipe';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink,StockStatusPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<string>();


  onAddToCart(): void {
    this.addToCart.emit(this.product._id);
  }

}
