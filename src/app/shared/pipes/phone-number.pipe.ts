import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'phoneNumberPipe'
})
export class PhoneNumberPipe implements PipeTransform {
    transform(tel) {
        if (tel != null && tel.length == 13) {
            const value = tel?.toString().trim();
            const city = value.slice(3, 6);
            const firtsNumber = value.slice(6, 9);
            const lastNumber = value.slice(9, 13);

            return ('+90 ' + '(' + city + ')' + ' ' + firtsNumber + '-' + lastNumber).trim();
        } else {
            return '';
        }
    }
}
