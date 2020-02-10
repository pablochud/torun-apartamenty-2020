import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountWithComma'
})
export class AmountWithCommaPipe implements PipeTransform {

  transform(value: string): string {
    if (value === null || value === undefined) {
      return value;
    }
    return value.replace('.', ',');
  }

}
