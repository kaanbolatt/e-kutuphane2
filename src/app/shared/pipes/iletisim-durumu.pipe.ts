import { Pipe, PipeTransform } from '@angular/core';
import { IletisimDurumuEnum, iletisimDurumuDescriptions } from '../enums/iletisim-durumu.enum';

@Pipe({
    name: 'iletisimDurumuPipe'
})
export class IletisimDurumuPipe implements PipeTransform {
    transform(value: IletisimDurumuEnum): string {
        if (value != null || value != undefined) {
            const key = Object.keys(IletisimDurumuEnum)[Object.values(IletisimDurumuEnum).indexOf(value)];
            return iletisimDurumuDescriptions[key];
        }
        else {
            return '';
        }
    }
}
