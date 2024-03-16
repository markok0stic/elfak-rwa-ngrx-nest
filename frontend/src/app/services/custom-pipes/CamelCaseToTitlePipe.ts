import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToTitle'
})
export class CamelCaseToTitlePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }
    value = value.replace(/([A-Z])/g, ' $1');
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
