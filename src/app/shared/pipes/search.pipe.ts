import { Product } from './../../features/product/models/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:Product[], searchText:string) {
    return products.filter(product => {
      return product.title.toLowerCase().includes(searchText.toLowerCase());
    });
  }




}


