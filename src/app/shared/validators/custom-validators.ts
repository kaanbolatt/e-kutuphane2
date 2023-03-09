/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { CustomValidatorMessageDescriptions } from '../enums/custom-validator-messages';

export  function minLengthArrayValidator(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (control.value.length >= min) {
            return null;
        }

        const message = CustomValidatorMessageDescriptions.MinArrayLength.replace('{count}', min.toString());
        return { regex: { hataMesaji: message } };
    };
}

export function maxLengthArrayValidator(max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (control.value.length <= max) {
            return null;
        }

        const message = CustomValidatorMessageDescriptions.MaxArrayLength.replace('{count}', max.toString());
        return { regex: { hataMesaji: message } };
    };
}
