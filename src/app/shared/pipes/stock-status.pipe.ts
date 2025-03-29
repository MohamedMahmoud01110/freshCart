import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockStatus'
})
export class StockStatusPipe implements PipeTransform {

  transform(quantity : number) {
    if (quantity >= 60) {
      return null;
    } else {
      return `Only ${quantity} left in stock - order soon.`;
    }
  }

}
