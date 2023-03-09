import { Pipe, PipeTransform } from '@angular/core';
import { UserType, userTypeDescriptions } from '../enums/user-types.enum';

@Pipe({
    name: 'userTypePipe'
})
export class UserTypePipe implements PipeTransform {
    transform(value: UserType): string {
        if (value != null || value != undefined) {
            const key = Object.keys(UserType)[Object.values(UserType).indexOf(value)];
            return userTypeDescriptions[key];
        }
        else {
            return '';
        }
    }
}
