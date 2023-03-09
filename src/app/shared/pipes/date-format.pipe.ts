import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { CommonHelper } from '../helpers/common-helper';
@Pipe({ name: 'dateFormatPipe' })
export class DateFormatPipe implements PipeTransform {
    constructor(private ch: CommonHelper) {
    }

    // adding a default format in case you don't want to pass the format
    // then 'yyyy-MM-dd' will be used
    transform(date: Date | string, format: string = 'dd/MM/yyyy'): string {
        if (this.ch.isNullOrUndefined(date)) {
            return '';
        }
        date = new Date(date);  // if orginal type was a string
        return new DatePipe('tr-TR').transform(date, format, null, null);
    }
}
