import { Pipe, PipeTransform } from '@angular/core';
import { PublicationTypeEnum, publicationTypeEnumDescriptions } from '../enums/publication-type.enum';

@Pipe({
    name: 'publicationTypePipe'
})
export class PublicationTypePipe implements PipeTransform {
    transform(value: PublicationTypeEnum): string {
        if (value != null || value != undefined) {
            const key = Object.keys(PublicationTypeEnum)[Object.values(PublicationTypeEnum).indexOf(value)];
            return publicationTypeEnumDescriptions[key];
        }
        else {
            return '';
        }
    }
}
