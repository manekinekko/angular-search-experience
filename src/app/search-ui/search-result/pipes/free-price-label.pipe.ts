import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'freePriceLabel'
})
export class FreePriceLabelPipe implements PipeTransform {
  transform(value: string, currencySymbol: string, label: string): any {
    return Number(value.replace(currencySymbol, '')) === 0 ? label : value;
  }
}
