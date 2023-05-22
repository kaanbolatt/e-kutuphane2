import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncatePipe'
})
export class TruncatePipe implements PipeTransform {
  transform(text: string, length: number = 20, suffix: string = '...'): string {
    if (text != null && text.length != null && text.length > length) {
      const truncated: string = text.substring(0, length).trim() + suffix;
      return truncated;
    }
    return text;
  }
}
