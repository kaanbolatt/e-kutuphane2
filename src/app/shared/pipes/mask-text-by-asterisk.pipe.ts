import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'maskTextByAsteriks'
})
export class MaskTextByAsteriksPipe implements PipeTransform {
    transform(text: string, size: number = 2): string {
        if (text != null) {
            const length = text.length;
            let builder: string = '';

            if (length > size * 2) {
                builder = text.substring(0, size);
                for (let i = 0; i < length - (size * 2); i++) {
                    builder += '*';
                }
                builder += text.substring(length - size, length);
                return builder;
            }
            else {
                return text;
            }
        }
        else {
            return '';
        }
    }
}
