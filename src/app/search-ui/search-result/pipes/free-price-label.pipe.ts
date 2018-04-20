import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe is used to format the price of an application. If the current price is $0.00
 * This will replace the value with a "FREE" label.
 */
@Pipe({
  name: 'freePriceLabel'
})
export class FreePriceLabelPipe implements PipeTransform {
  transform(value: string, currencySymbol: string, label: string = 'FREE'): any {
    return Number(value.replace(currencySymbol, '')) === 0 ? label : value;
  }
}
