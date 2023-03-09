import { Pipe, PipeTransform } from '@angular/core';
import { Gender, genderDescriptions } from '../enums/gender.enum';

@Pipe({
    name: 'genderTypePipe'
})
export class GenderTypePipe implements PipeTransform {
    transform(value: Gender): string {
        if (value != null || value != undefined) {
            const key = Object.keys(Gender)[Object.values(Gender).indexOf(value)];
         return genderDescriptions[key];
        }
        else {
            return '';
        }
    }
}
