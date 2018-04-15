import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeCurrencySymbol'
})
export class RemoveCurrencySymbolPipe implements PipeTransform {
  transform(value: any, currencySymbol: string): any {
    return value.replace(currencySymbol, '').trim();
  }
}
