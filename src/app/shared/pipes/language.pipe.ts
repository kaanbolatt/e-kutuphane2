import { Pipe, PipeTransform } from '@angular/core';
import { LanguageEnum, languageEnumDescriptions } from '../enums/language-type.enum';

@Pipe({
    name: 'languagePipe'
})
export class LanguagePipe implements PipeTransform {
    transform(value: LanguageEnum): string {
        if (value != null || value != undefined) {
            const key = Object.keys(LanguageEnum)[Object.values(LanguageEnum).indexOf(value)];
            return languageEnumDescriptions[key];
        }
        else {
            return '';
        }
    }
}
