/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { RegexType, regexTypeMessageDescriptions, regexTypeDescriptions } from '../enums/regex-type';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ValidatorRegex(regexType: RegexType): ValidatorFn {
    return (control: AbstractControl) => {
        if (control.value) {
            const pattern = new RegExp(regexTypeDescriptions[RegexType[regexType]]);
            const sonuc = pattern.test(control.value);
            if (sonuc === false) {
                return { regex: { hataMesaji: regexTypeMessageDescriptions[RegexType[regexType]] } };
            }
        }
        return null;
    };
}
